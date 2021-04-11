import { Document } from 'mongoose';

export interface IIngredient {
  name: string;
  image?: string;
}

export interface IIngredientModel extends IIngredient, Document {}
