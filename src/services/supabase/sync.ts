import {
  getEntryById,
  getPendingEntries,
  upsertEntry,
  clearPendingAction,
  hardDeleteEntry,
} from "@/services/db/queries";
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

  for (const remoteEntry of remoteEntries) {
    const localEntry = await getEntryById(remoteEntry.id);

    if (!localEntry) {
      // Exists on remote but not locally (created on another device)
      await upsertEntry(remoteEntry);
    } else if (remoteEntry.updatedAt > localEntry.updatedAt) {
      // Remote is newer — take it; if local had a pendingAction it gets discarded
      await upsertEntry(remoteEntry);
    }
    // local.updatedAt >= remote.updatedAt → local wins; pendingAction (if any) goes to push step
  }

  // --- Push ---
  const pendingEntries = await getPendingEntries();

  for (const pendingEntry of pendingEntries) {
    if (
      pendingEntry.pendingAction === "create" ||
      pendingEntry.pendingAction === "update"
    ) {
      await upsertRemoteEntry(pendingEntry);
      await clearPendingAction(pendingEntry.id);
    } else if (pendingEntry.pendingAction === "delete") {
      await markRemoteDeleted(pendingEntry.id, pendingEntry.deletedAt!);
      await hardDeleteEntry(pendingEntry.id);
    }
  }
};
