import { TEntry } from "@/utils/db/types";
import { supabase } from "./client";

type TRemoteEntry = {
  id: string;
  user_id: string;
  title: string;
  body: string;
  created_at: number;
  updated_at: number;
  deleted_at: number | null;
};

const toLocal = (row: TRemoteEntry): TEntry => ({
  id: row.id,
  title: row.title,
  body: row.body,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
  deletedAt: row.deleted_at,
  pendingAction: null,
});

const toRemote = (entry: TEntry, userId: string): TRemoteEntry => ({
  id: entry.id,
  user_id: userId,
  title: entry.title,
  body: entry.body,
  created_at: entry.createdAt,
  updated_at: entry.updatedAt,
  deleted_at: entry.deletedAt,
});

export const fetchRemoteEntries = async (): Promise<TEntry[]> => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) throw new Error("fetchRemoteEntries: no active session");

  const { data, error } = await supabase
    .from("entries")
    .select("*")
    .eq("user_id", session.user.id);

  if (error) throw error;

  return (data as TRemoteEntry[]).map(toLocal);
};

export const upsertRemoteEntry = async (entry: TEntry): Promise<void> => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) throw new Error("upsertRemoteEntry: no active session");

  const { error } = await supabase
    .from("entries")
    .upsert(toRemote(entry, session.user.id));

  if (error) throw error;
};

export const markRemoteDeleted = async (
  id: string,
  deletedAt: number,
): Promise<void> => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) throw new Error("markRemoteDeleted: no active session");

  const { error } = await supabase
    .from("entries")
    .update({ deleted_at: deletedAt, updated_at: deletedAt })
    .eq("id", id)
    .eq("user_id", session.user.id);

  if (error) throw error;
};
