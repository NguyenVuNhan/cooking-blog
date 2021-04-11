import { Document } from 'mongoose';
import { IUser } from './user';

interface IIngredientElem {
  ingredient: string;
  quantity: string;
}
type IIngredientList = IIngredientElem[];

interface Step {
  description: string;
  duration?: string;
  ingredients: IIngredientList;
}

export interface IRecipe {
  title: string;
  user: IUser;
  course: string;
  ingredients: IIngredientList;
  ingredientsStr: string;
  duration: number;
  steps: Step[];
}

export interface IRecipeModel extends IRecipe, Document {}
