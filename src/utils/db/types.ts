export type TEntry = {
  id: string;
  title: string;
  body: string;
  createdAt: number;
  updatedAt: number;
  deletedAt: number | null;
  pendingAction: "create" | "update" | "delete" | null;
};
