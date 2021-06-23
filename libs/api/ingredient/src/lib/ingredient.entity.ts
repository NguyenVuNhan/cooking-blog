import { BaseEntity } from '@cookingblog/express/api/mongoose';
import { Document } from 'mongoose';

export interface IIngredient extends BaseEntity {
  name: string;
  image?: string;
  possibleUnits: string[];
  aisle: string;
}

export type IIngredientModel = IIngredient & Document<string>;
