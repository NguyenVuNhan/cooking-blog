import { IIngredientService } from '@cookingblog/api/ingredient';
import { ISpoonacularRecipesService } from '@cookingblog/api/spoonacular/recipes';
import { ILogger } from '@cookingblog/express/api/common';
import {
  IBaseRepository,
  IBaseService,
  ServiceCache,
} from '@cookingblog/express/api/core';
import { IRecipe, IRecipeModel } from './recipe.entity';
import { ISpoonacularIngredientsService } from '../../../spoonacular/ingredients/src/lib/ingredient.types';

// ======================================================================
// Repository
// ======================================================================
export interface IRecipeRepository extends IBaseRepository<IRecipeModel> {
  /**
   * @return {Promise<IRecipeModel>} Promise object of recipe with ingredient field populated
   */
  getRandom(): Promise<IRecipeModel>;

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
  spoonacularRecipesService: ISpoonacularRecipesService;
  spoonacularIngredientsService: ISpoonacularIngredientsService;
};

export interface IRecipeService extends IBaseService<IRecipeModel> {
  /**
   * @param {string} user The current user id.
   * @param {string} url The web site url to extract data
   *
   * @return {Promise<IRecipe>} Promise of extracted recipe
   */
  extractRecipe(user: string, url: string): Promise<IRecipe>;

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
   * @return {Promise<IRecipeModel>} return promise recipe
   */
  getRandomRecipe(): Promise<IRecipeModel>;

  /**
   * @param {string} user User id
   * @param {string} id Recipe id
   *
   * @return {Promise<boolean>} return promise of delete result. True if successfully deleted, else false.
   */
  deleteRecipe(user: string, id: string): Promise<boolean>;
}
