import { IRecipe } from '@cookingblog/api/recipe';
import { RecipeDTO } from '@cookingblog/api/recipe/dto';
import { BaseResponse } from '@cookingblog/express/api/core';

// ======================================================================
// Request
// ======================================================================
export type AddRecipeReq = RecipeDTO;
export type UpdateRecipeReq = Partial<RecipeDTO>;

// ======================================================================
// Response
// ======================================================================
type CommonData = {
  id: string;
  title: string;
};

export type AddRecipeRes = BaseResponse<CommonData>;
export type DeleteRecipeRes = BaseResponse<{ id: string }>;
export type UpdateRecipeRes = BaseResponse<CommonData>;
export type SearchRecipeRes = BaseResponse<{ recipes: IRecipe[] }>;
export type GetRecipeRes = BaseResponse<IRecipe>;
export type ExtractRecipeRes = BaseResponse<IRecipe>;
