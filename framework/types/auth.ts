import { Role } from "../core/models/users";

export type LoginApiRequest = {
  username: string;
  password: string;
};

export type LoginApiResponse = {
  token: string;
  user: {
    id: string;
    username: string;
    role: Role;
  };
};

export type AuthErrorResponse = {
  error: string;
};
