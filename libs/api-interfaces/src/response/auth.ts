import { BaseRes } from './base';

export type LoginRes = BaseRes<{
  user: { id: string; email: string };
  token: string;
}>;

export type RegisterRes = BaseRes<{
  email: string;
}>;
