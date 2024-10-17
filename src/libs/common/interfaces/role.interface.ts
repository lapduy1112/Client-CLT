import { PermissionInterface } from './permission.interface';
export interface RoleInterface {
  id: string;
  role: string;
  permission: PermissionInterface[];
  createdAt: Date;
  updatedAt: Date;
}
export interface createRoleInterface {
  role: string;
  permissionId?: string[];
}
export interface updateRoleInterface {
  id: string;
  role?: string;
  permissionId?: string[];
}
