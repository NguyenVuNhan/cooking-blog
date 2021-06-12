import { IUser } from '@cookingblog/api/user';
import { IIngredient } from '@cookingblog/api/ingredient';
import { Document } from 'mongoose';
import { BaseEntity } from '@cookingblog/express/api/mongoose';

export interface IRecipeGeneric<
  TIngredient extends string | IIngredient,
  TUser extends string | IUser
> extends BaseEntity {
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

export type IRecipe = IRecipeGeneric<string, string>;
export type IRecipeWithIngredient = IRecipeGeneric<IIngredient, string>;
export type IRecipeWithUser = IRecipeGeneric<string, IUser>;
export type IRecipePopulatedAll = IRecipeGeneric<IIngredient, IUser>;

export interface IRecipeModelGeneric<
  TIngredient extends string | IIngredient,
  TUser extends string | IUser
> extends IRecipeGeneric<TIngredient, TUser>,
    Document<string> {
  id: string;
}

export type IRecipeModel = IRecipeModelGeneric<string, string> &
  Document<string>;
export type IRecipeModelWithIngredient = IRecipeModelGeneric<
  IIngredient,
  string
> &
  Document<string>;
export type IRecipeModelWithUser = IRecipeModelGeneric<string, IUser> &
  Document<string>;
export type IRecipeModelPopulatedAll = IRecipeModelGeneric<IIngredient, IUser> &
  Document<string>;
