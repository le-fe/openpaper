export type ILoginRequestData = {
  username: string;
  password: string;
};

export type IRegisterRequestData = {
  username: string;
  password: string;
  avatar?: string;
  nickname?: string;
};
