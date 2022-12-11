export interface IUser {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  avatar: string;
  isActive: boolean;
  permission: string;
  createdAt: Date;
  updatedAt: Date;
}
