import { IIngredientService } from '@cookingblog/api/ingredient';
import { ILogger } from '@cookingblog/express/api/common';
import {
  BaseResponse,
  IBaseRepository,
  IBaseService,
  ServiceCache,
} from '@cookingblog/express/api/core';
import { RecipeDTO } from './recipe.dto';
import { IRecipe, IRecipeModel, IRecipeWithIngredient } from './recipe.entity';

// ======================================================================
// Repository
// ======================================================================
export interface IRecipeRepository extends IBaseRepository<IRecipeModel> {
  /**
   * @param {string} query Query to search for.
   *
   * @return {Promise<IRecipeModel[]>} Promise of array of recipe
   */
  search(query: string): Promise<IRecipeModel[]>;
}

// ======================================================================
// Service
// ======================================================================
export type RecipeServiceProp = {
  ingredientService: IIngredientService;
  repo: IRecipeRepository;
  logger: ILogger;
  serviceCache: ServiceCache;
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IRecipeService extends IBaseService<IRecipeModel> {
  /**
   * @param {string} query Query to search for.
   *
   * @return {Promise<IRecipeModel[]>} Promise of array of recipe
   */
  search(query: string): Promise<IRecipeModel[]>;

  /**
   * @param {string} user User id
   * @param {string} id Recipe id
   * @param {Partial<IRecipeModel>} doc Values to update recipe
   *
   * @return {Promise<IRecipeModel>} return promise of object represent for updated recipe
   */
  updateRecipe(
    user: string,
    id: string,
    doc: Partial<IRecipeModel>
  ): Promise<IRecipeModel>;

  /**
   * @param {string} user User id
   * @param {string} id Recipe id
   *
   * @return {Promise<boolean>} return promise of delete result. True if successfully deleted, else false.
   */
  deleteRecipe(user: string, id: string): Promise<boolean>;
}

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
export type GetRecipeRes = BaseResponse<IRecipeWithIngredient>;
