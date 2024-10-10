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
