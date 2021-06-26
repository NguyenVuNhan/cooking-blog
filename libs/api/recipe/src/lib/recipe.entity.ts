import { IIngredient } from '@cookingblog/api/ingredient';
import { BaseEntity } from '@cookingblog/express/api/mongoose';
import { Document } from 'mongoose';

export interface IRecipeIngredient<
  TIngredient extends string | IIngredient = string
> {
  ingredient: TIngredient;
  ingredient_name: string;
  quantity: number;
  unit?: string;
  raw_data: string;
}

export interface IRecipeStep {
  description: string;
  duration: string;
  ingredients: string[];
}

export interface IRecipeGeneric<TIngredient extends string | IIngredient>
  extends BaseEntity {
  title: string;
  user: string;
  serving: number;
  ingredientsStr: string;
  ingredients: IRecipeIngredient<TIngredient>[];
  duration: string;
  steps: IRecipeStep[];
}

export type IRecipe = IRecipeGeneric<string>;
export type IRecipeWithIngredient = IRecipeGeneric<IIngredient>;

// Models
export type IRecipeModel = IRecipe & Document<string>;
export type IRecipeModelWithIngredient = IRecipeWithIngredient &
  Document<string>;
