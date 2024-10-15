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
