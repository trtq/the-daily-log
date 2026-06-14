import * as SQLite from "expo-sqlite";
import { TEntry } from "./types";

const db = SQLite.openDatabaseSync("daily-log.db");

export const initDb = async (): Promise<void> => {
  await db.execAsync(`PRAGMA journal_mode = WAL`); //Write-Ahead Log
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
  return db.getAllAsync<TEntry>(
    `SELECT * FROM entries WHERE deletedAt IS NULL ORDER BY createdAt DESC`,
  );
};

export const getEntryById = async (id: string): Promise<TEntry | null> => {
  return db.getFirstAsync<TEntry>(`SELECT * FROM entries WHERE id = ?`, [id]);
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
  return db.getAllAsync<TEntry>(
    `SELECT * FROM entries WHERE pendingAction IS NOT NULL`,
  );
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
