import { IIngredient } from '../data/ingredient';
import { IRecipe } from '../data/recipe';
import { BaseRes } from './base';

type CommonData = {
  id: string;
  title: string;
};

export type AddRecipeRes = BaseRes<CommonData>;

export type DeleteRecipeRes = BaseRes<CommonData>;

export type SearchRecipeRes = BaseRes<{
  recipes: IRecipe[];
}>;

export type UpdateRecipeRes = BaseRes<CommonData>;

export type GetRecipeRes = BaseRes<IRecipe<IIngredient>>;
