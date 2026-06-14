import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import * as Crypto from "expo-crypto";
import { TEntry } from "@/services/db/types";
import {
  getAllEntries,
  insertEntry,
  updateEntry as updateEntryInDb,
  markForDeletion,
  hardDeleteEntry,
  getEntryById,
  clearPendingAction,
} from "@/services/db/queries";
import {
  upsertRemoteEntry,
  markRemoteDeleted,
} from "@/services/supabase/entries";

type TEntriesState = {
  entries: TEntry[];
  isLoading: boolean;
  error: string | null;
};

export const loadEntries = createAsyncThunk("entries/load", () =>
  getAllEntries(),
);

export const createEntry = createAsyncThunk(
  "entries/create",
  async ({ title, body }: { title: string; body: string }) => {
    const now = Date.now();
    const entry: TEntry = {
      id: Crypto.randomUUID(),
      title,
      body,
      createdAt: now,
      updatedAt: now,
      deletedAt: null,
      pendingAction: "create",
    };
    await insertEntry(entry);
    try {
      await upsertRemoteEntry(entry);
      await clearPendingAction(entry.id);
      entry.pendingAction = null;
    } catch {
      // offline or network error — pendingAction stays, full sync will push it
    }
    return entry;
  },
);

export const editEntry = createAsyncThunk(
  "entries/edit",
  async ({
    id,
    title,
    body,
    createdAt,
    deletedAt,
  }: {
    id: string;
    title: string;
    body: string;
    createdAt: number;
    deletedAt: number | null;
  }) => {
    const updatedAt = Date.now();
    await updateEntryInDb({ id, title, body, updatedAt });
    let pendingAction: TEntry["pendingAction"] = "update";
    try {
      await upsertRemoteEntry({ id, title, body, createdAt, updatedAt, deletedAt, pendingAction: "update" });
      await clearPendingAction(id);
      pendingAction = null;
    } catch {
      // offline — pendingAction stays
    }
    return { id, title, body, updatedAt, pendingAction };
  },
);

export const deleteEntry = createAsyncThunk(
  "entries/delete",
  async (id: string) => {
    const entry = await getEntryById(id);
    if (entry?.pendingAction === "create") {
      // never synced — just remove locally, nothing to push
      await hardDeleteEntry(id);
    } else {
      await markForDeletion(id);
      try {
        // read back to get the deletedAt set by markForDeletion
        const deleted = await getEntryById(id);
        await markRemoteDeleted(id, deleted!.deletedAt!);
        await hardDeleteEntry(id);
      } catch {
        // offline — pendingAction: 'delete' stays for full sync
      }
    }
    return id;
  },
);

const initialState: TEntriesState = {
  entries: [],
  isLoading: false,
  error: null,
};

const entriesSlice = createSlice({
  name: "entries",
  initialState,
  reducers: {
    clearEntries: () => initialState,
    setEntries: (state, action: PayloadAction<TEntry[]>) => {
      state.entries = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadEntries.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadEntries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.entries = action.payload;
      })
      .addCase(loadEntries.rejected, (state) => {
        state.isLoading = false;
        state.error = "Failed to load entries";
      })
      .addCase(createEntry.fulfilled, (state, action) => {
        state.entries.unshift(action.payload);
      })
      .addCase(editEntry.fulfilled, (state, action) => {
        const entry = state.entries.find((e) => e.id === action.payload.id);
        if (entry) {
          entry.title = action.payload.title;
          entry.body = action.payload.body;
          entry.updatedAt = action.payload.updatedAt;
          entry.pendingAction = action.payload.pendingAction;
        }
      })
      .addCase(deleteEntry.fulfilled, (state, action) => {
        state.entries = state.entries.filter((e) => e.id !== action.payload);
      });
  },
});

export const { clearEntries, setEntries } = entriesSlice.actions;
export default entriesSlice.reducer;
