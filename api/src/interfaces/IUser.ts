export interface IUser {
  username: string;
  password: string;
  nickname: string;
  avatar: string;
  isActive: boolean;
  permission: string;
  createdAt: Date;
  updatedAt: Date;
}
