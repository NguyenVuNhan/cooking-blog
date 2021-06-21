import { IIngredientService } from '@cookingblog/api/ingredient';
import { ILogger } from '@cookingblog/express/api/common';
import {
  IBaseRepository,
  IBaseService,
  ServiceCache,
} from '@cookingblog/express/api/core';
import { IRecipeModel, IRecipeModelWithIngredient } from './recipe.entity';

// ======================================================================
// Repository
// ======================================================================
export interface IRecipeRepository extends IBaseRepository<IRecipeModel> {
  /**
   * @param {string} id Id of recipe
   *
   * @return {Promise<IRecipeModelWithIngredient>} Promise object of recipe with ingredient field populated
   */
  findById(id: string): Promise<IRecipeModelWithIngredient>;

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
   * @param {string} id Recipe id
   *
   * @return {Promise<IRecipeModelWithIngredient>} return promise recipe
   */
  getRecipe(id: string): Promise<IRecipeModelWithIngredient>;

  /**
   * @param {string} user User id
   * @param {string} id Recipe id
   *
   * @return {Promise<boolean>} return promise of delete result. True if successfully deleted, else false.
   */
  deleteRecipe(user: string, id: string): Promise<boolean>;
}