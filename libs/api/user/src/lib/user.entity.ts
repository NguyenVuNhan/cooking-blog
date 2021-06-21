import { BaseEntity } from '@cookingblog/express/api/mongoose';
import { Document } from 'mongoose';

export interface IUser extends BaseEntity {
  name: string;
  email: string;
  password: string;
  recipe_rank: string;
}

export interface IUserModel extends IUser, Document<string> {
  id: string;
  comparePassword(
    password: string,
    cb: (error: Error, result: boolean) => void
  ): string;
  gravatar(_size: number): string;
}
