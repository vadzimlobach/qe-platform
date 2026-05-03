export type Role = "standard" | "locked";

export type User = {
  id: string;
  username: string;
  role: Role;
};

export type CreateUserApiRequest = {
  username: string;
  password: string;
  role: Role;
};

export type CreateUserApiResponse = {
  user: User;
};

export type GetUsersApiResponse = {
  users: User[];
};
