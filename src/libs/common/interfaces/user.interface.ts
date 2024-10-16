import { PermissionInterface } from './permission.interface';
export interface UserInterface {
  token: any;
  id: string;
  username: string;
  email: string;
  profileImage: string;
  isVerified: boolean;
  role: string;
  permission: PermissionInterface[];
  createdAt: string;
  updatedAt: string;
}
export interface UserUpdateInterface {
  id: string;
  username?: string;
  isVerified?: string;
}
export interface UserUpdatePasswordInterface {
  password: string;
  newPassword: string;
  confirmPassword: string;
}
export interface UserUpdateRoleInterface {
  id: string;
  roleId: string;
}
