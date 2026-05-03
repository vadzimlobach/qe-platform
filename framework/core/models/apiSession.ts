import { Role, User } from "./users";

export type ApiSession = {
  user: User;
  token: string;
};

export type ApiSessionOptions = {
  role?: Role;
};
