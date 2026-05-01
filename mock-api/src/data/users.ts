export type MockUser = {
    id: number,
    username: string,
    password: string,
    role: "standard" | "locked";
}

export const users: MockUser[] = [
  {
    id: 1,
    username: 'standard_user',
    password: 'secret_sauce',
    role: 'standard',
  },
  {
    id: 2,
    username: 'locked_out_user',
    password: 'secret_sauce',
    role: 'locked',
  },
];