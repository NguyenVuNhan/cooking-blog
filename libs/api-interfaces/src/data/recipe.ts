import { Document } from 'mongoose';

export interface IRecipe<TIngredient = string, TUser = string> {
  _id: string;
  title: string;
  // User can be either string or IUser
  user: TUser;
  ingredientsStr: string;
  duration: string;
  steps: {
    description: string;
    duration: string;
    ingredients: string[];
  }[];
  ingredients: {
    // Ingredient can be either string or IIngredientList
    ingredient: TIngredient;
    quantity: string;
  }[];
}

export interface IRecipeModel extends IRecipe, Document {
  _id: string;
}
