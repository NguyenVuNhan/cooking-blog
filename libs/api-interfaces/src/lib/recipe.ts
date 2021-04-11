import { Document } from 'mongoose';
import { User } from './user';

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

export interface Recipe {
  title: string;
  user: User;
  course: string;
  ingredients: IIngredientList;
  ingredientsStr: string;
  duration: number;
  steps: Step[];
}

export interface RecipeModel extends Recipe, Document {}
