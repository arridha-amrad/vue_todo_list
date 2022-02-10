export interface Todo {
  id: string;
  title: string;
  isComplete: boolean;
  level: "normal" | "urgent";
  createdAt: Date;
  updatedAt: Date;
  isEdit?: boolean;
}
