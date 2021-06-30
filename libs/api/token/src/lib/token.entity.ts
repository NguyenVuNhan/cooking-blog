import { BaseEntity } from '@cookingblog/express/api/mongoose';
import { Document } from 'mongoose';

export interface IToken extends BaseEntity {
  user: string;
  token: string;
  createAt: Date;
}

export interface ITokenModel extends IToken, Document<string> {
  id: string;
}
