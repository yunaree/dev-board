import { Request } from 'express';

export interface RequestWithUser extends Request {
  user: {
    sub: number;
    username: string;
    avatar?: string | null;
    email?: string | null;
    iat?: number;
    exp?: number;
  };
}