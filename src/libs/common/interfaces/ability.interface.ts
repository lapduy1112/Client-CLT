export type Actions = "manage" | "create" | "read" | "update" | "delete";
export type Subjects =
  | "User"
  | "Route"
  | "Permission"
  | "Role"
  | { type: string };
export type Abilities = [Actions, Subjects];
