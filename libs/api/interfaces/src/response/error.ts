import { BaseRes } from './base';

export type ErrorRes = BaseRes<{
  errors: {
    msg: string;
    param: string;
    location?: string;
  }[];
}>;
