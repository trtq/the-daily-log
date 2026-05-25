import * as SQLite from "expo-sqlite";
import { TEntry } from "./types";

const db = SQLite.openDatabaseSync("daily-log.db");

type TEntryRow = Omit<TEntry, "pendingAction"> & {
  pendingAction: string | null;
};

// casts pendingAction from string | null (SQLite) to the union type TEntry expects
const rowToEntry = (row: TEntryRow): TEntry => ({
  ...row,
  pendingAction: row.pendingAction as TEntry["pendingAction"],
});

export const initDb = async () => {
  await db.execAsync(`PRAGMA journal_mode = WAL`);
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS entries (
      id TEXT PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      body TEXT NOT NULL,
      createdAt INTEGER NOT NULL,
      updatedAt INTEGER NOT NULL,
      deletedAt INTEGER DEFAULT NULL,
      pendingAction TEXT DEFAULT NULL
    )
  `);
};

export const getAllEntries = async (): Promise<TEntry[]> => {
  const rows = await db.getAllAsync<TEntryRow>(
    `SELECT * FROM entries WHERE deletedAt IS NULL ORDER BY createdAt DESC`,
  );
  return rows.map(rowToEntry);
};

export const getEntryById = async (id: string): Promise<TEntry | null> => {
  const row = await db.getFirstAsync<TEntryRow>(
    `SELECT * FROM entries WHERE id = ?`,
    [id],
  );
  return row ? rowToEntry(row) : null;
};

export const insertEntry = async (entry: TEntry): Promise<void> => {
  await db.runAsync(
    `INSERT INTO entries (id, title, body, createdAt, updatedAt, deletedAt, pendingAction)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      entry.id,
      entry.title,
      entry.body,
      entry.createdAt,
      entry.updatedAt,
      entry.deletedAt,
      entry.pendingAction,
    ],
  );
};

export const updateEntry = async (
  entry: Pick<TEntry, "id" | "title" | "body" | "updatedAt">,
): Promise<void> => {
  await db.runAsync(
    // preserves 'create' if the entry was never synced, otherwise marks as 'update'
    `UPDATE entries SET title = ?, body = ?, updatedAt = ?,
      pendingAction = CASE WHEN pendingAction = 'create' THEN 'create' ELSE 'update' END
     WHERE id = ?`,
    [entry.title, entry.body, entry.updatedAt, entry.id],
  );
};

export const markForDeletion = async (id: string): Promise<void> => {
  const now = Date.now();
  await db.runAsync(
    // updatedAt is also bumped so the deletion timestamp participates in last-write-wins comparison
    `UPDATE entries SET deletedAt = ?, updatedAt = ?, pendingAction = 'delete' WHERE id = ?`,
    [now, now, id],
  );
};

export const clearPendingAction = async (id: string): Promise<void> => {
  await db.runAsync(`UPDATE entries SET pendingAction = NULL WHERE id = ?`, [
    id,
  ]);
};

export const hardDeleteEntry = async (id: string): Promise<void> => {
  await db.runAsync(`DELETE FROM entries WHERE id = ?`, [id]);
};

// wipes all local entries on logout so the next user starts with a clean slate
export const deleteAllEntries = async (): Promise<void> => {
  await db.runAsync(`DELETE FROM entries`);
};

export const getPendingEntries = async (): Promise<TEntry[]> => {
  const rows = await db.getAllAsync<TEntryRow>(
    `SELECT * FROM entries WHERE pendingAction IS NOT NULL`,
  );
  return rows.map(rowToEntry);
};

export const upsertEntry = async (entry: TEntry): Promise<void> => {
  await db.runAsync(
    `INSERT INTO entries (id, title, body, createdAt, updatedAt, deletedAt, pendingAction)
     VALUES (?, ?, ?, ?, ?, ?, ?)
     ON CONFLICT(id) DO UPDATE SET
       title = excluded.title,
       body = excluded.body,
       updatedAt = excluded.updatedAt,
       deletedAt = excluded.deletedAt,
       pendingAction = excluded.pendingAction`,
    [
      entry.id,
      entry.title,
      entry.body,
      entry.createdAt,
      entry.updatedAt,
      entry.deletedAt,
      entry.pendingAction,
    ],
  );
};
