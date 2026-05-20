import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as Crypto from "expo-crypto";
import { TEntry } from "@/utils/db/types";
import {
  getAllEntries,
  insertEntry,
  updateEntry as updateEntryInDb,
  markForDeletion,
  hardDeleteEntry,
  getEntryById,
} from "@/utils/db/queries";

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
    return entry;
  },
);

export const editEntry = createAsyncThunk(
  "entries/edit",
  async ({ id, title, body }: { id: string; title: string; body: string }) => {
    const updatedAt = Date.now();
    await updateEntryInDb({ id, title, body, updatedAt });
    return { id, title, body, updatedAt };
  },
);

export const deleteEntry = createAsyncThunk(
  "entries/delete",
  async (id: string) => {
    const entry = await getEntryById(id);
    if (entry?.pendingAction === "create") {
      await hardDeleteEntry(id);
    } else {
      await markForDeletion(id);
    }
    return id;
  },
);

const entriesSlice = createSlice({
  name: "entries",
  initialState: { entries: [], isLoading: false, error: null } as TEntriesState,
  reducers: {
    clearEntries: (state) => {
      state.entries = [];
      state.error = null;
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
          if (entry.pendingAction !== "create") entry.pendingAction = "update";
        }
      })
      .addCase(deleteEntry.fulfilled, (state, action) => {
        state.entries = state.entries.filter((e) => e.id !== action.payload);
      });
  },
});

export const { clearEntries } = entriesSlice.actions;
export default entriesSlice.reducer;
