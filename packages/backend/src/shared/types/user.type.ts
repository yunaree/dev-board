export type UserPayload = {
  sub: number; // user id
  username: string;
};

export interface User {
  id: number;
  username: string;
  password:string | null; 
  email:string | null; 
  provider:string;
  providerId:string | null; 
  createdAt: Date;
  updatedAt: Date;
  refreshToken:  string | null; 
}
