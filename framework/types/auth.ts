export type LoginApiRequest = {
  username: string;
  password: string;
};

export type LoginApiResponse = {
  token: string;
  user: {
    id: string;
    username: string;
    role: string;
  };
};

export type AuthErrorResponse = {
  error: string;
};
