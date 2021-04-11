import { Document } from 'mongoose';

export interface Ingredient {
  name: string;
  image?: string;
}

export interface IngredientModel extends Ingredient, Document {}
