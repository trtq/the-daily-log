import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { syncEntries } from "@/services/supabase/sync";
import { getAllEntries } from "@/services/db/queries";
import { setEntries } from "./entriesSlice";

type TSyncState = {
  isSyncing: boolean;
  lastSynced: number | null;
  error: string | null;
};

export const runSync = createAsyncThunk("sync/run", async (_, { dispatch }) => {
  await syncEntries();
  dispatch(setEntries(await getAllEntries()));
});

const initialState: TSyncState = {
  isSyncing: false,
  lastSynced: null,
  error: null,
};

const syncSlice = createSlice({
  name: "sync",
  initialState,
  reducers: { resetSync: () => initialState },
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
