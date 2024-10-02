import { PermissionInterface } from "./permission.interface";
export interface UserInterface {
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
