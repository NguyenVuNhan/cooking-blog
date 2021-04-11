import { Document } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  password: string;
}

export interface IUserModel extends IUser, Document {
  id: string;
  comparePassword(
    password: string,
    cb: (error: Error, result: boolean) => void
  ): string;
  gravatar(_size: number): string;
}
