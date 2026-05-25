import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { syncEntries } from "@/utils/supabase/sync";
import { getAllEntries } from "@/utils/db/queries";
import { setEntries } from "./entriesSlice";
import type { AppDispatch } from "../store";

type TSyncState = {
  isSyncing: boolean;
  lastSynced: number | null;
  error: string | null;
};

export const runSync = createAsyncThunk<void, void, { dispatch: AppDispatch }>(
  "sync/run",
  async (_, { dispatch }) => {
    await syncEntries();
    dispatch(setEntries(await getAllEntries()));
  },
);

const syncSlice = createSlice({
  name: "sync",
  initialState: {
    isSyncing: false,
    lastSynced: null,
    error: null,
  } as TSyncState,
  reducers: {
    resetSync: (state) => {
      state.isSyncing = false;
      state.lastSynced = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(runSync.pending, (state) => {
        state.isSyncing = true;
        state.error = null;
      })
      .addCase(runSync.fulfilled, (state) => {
        state.isSyncing = false;
        state.lastSynced = Date.now();
      })
      .addCase(runSync.rejected, (state, action) => {
        state.isSyncing = false;
        state.error = action.error.message ?? "Sync failed";
      });
  },
});

export const { resetSync } = syncSlice.actions;
export default syncSlice.reducer;
