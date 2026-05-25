import {
  getEntryById,
  getPendingEntries,
  upsertEntry,
  clearPendingAction,
  hardDeleteEntry,
} from "@/utils/db/queries";
import {
  fetchRemoteEntries,
  upsertRemoteEntry,
  markRemoteDeleted,
} from "./entries";

// Pull-before-push sync:
//   1. Fetch all remote entries and merge into local SQLite
//   2. Push local pending entries to remote, then clear their pendingAction
//
// Conflict resolution: last-write-wins on updatedAt.
// Remote newer → remote wins, any local pendingAction is discarded.
// Local newer (or equal) → local wins, pendingAction (if any) is pushed in step 2.

export const syncEntries = async (): Promise<void> => {
  // --- Pull ---
  const remoteEntries = await fetchRemoteEntries();

  for (const remote of remoteEntries) {
    const local = await getEntryById(remote.id);

    if (!local) {
      // Exists on remote but not locally (created on another device)
      await upsertEntry(remote);
    } else if (remote.updatedAt > local.updatedAt) {
      // Remote is newer — take it; if local had a pendingAction it gets discarded
      await upsertEntry(remote);
    }
    // local.updatedAt >= remote.updatedAt → local wins; pendingAction (if any) goes to push step
  }

  // --- Push ---
  const pending = await getPendingEntries();

  for (const entry of pending) {
    if (entry.pendingAction === "create" || entry.pendingAction === "update") {
      await upsertRemoteEntry(entry);
      await clearPendingAction(entry.id);
    } else if (entry.pendingAction === "delete") {
      await markRemoteDeleted(entry.id, entry.deletedAt!);
      await hardDeleteEntry(entry.id);
    }
  }
};
