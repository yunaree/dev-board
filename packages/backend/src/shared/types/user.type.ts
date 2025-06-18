export type UserPayload = {
  sub: number; // user id
  username: string;
};

export interface User {
  id: number;
  username: string;
  password: string;
  refreshToken: string | null;
}
