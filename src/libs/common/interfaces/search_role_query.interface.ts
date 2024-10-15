export interface SearchRoleQueryInterface {
  searchTerm?: string;
  page?: number;
  sort?: string;
  permission_action?: string;
  permission_object?: string;
  permission_possession?: string;
}
