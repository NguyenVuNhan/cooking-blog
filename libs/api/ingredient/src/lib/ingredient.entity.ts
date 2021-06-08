import { Document } from 'mongoose';
import { BaseEntity } from '@cookingblog/express/api/mongoose';

export interface IIngredient extends BaseEntity {
  name: string;
  image?: string;
}

export interface IIngredientModel extends IIngredient, Document<string> {
  id: string;
}
