import { Document } from 'mongoose';

export interface User {
  name: string;
  email: string;
  password: string;
}

export interface UserModel extends User, Document {
  comparePassword(
    password: string,
    cb: (error: Error, result: boolean) => void
  ): string;
  gravatar(_size: number): string;
}
