import { PermissionInterface } from './permission.interface';
export interface RoleInterface {
  id: string;
  role: string;
  permission: PermissionInterface[];
  createdAt: Date;
  updatedAt: Date;
}
