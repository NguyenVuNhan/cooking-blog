import { ILogger } from '@cookingblog/express/api/common';
import {
  BaseResponse,
  IBaseRepository,
  IBaseService,
  ServiceCache,
} from '@cookingblog/express/api/core';
import { IIngredientModel } from './ingredient.entity';

// ======================================================================
// Repository
// ======================================================================
export interface IIngredientRepository
  extends IBaseRepository<IIngredientModel> {
  /**
   * Search ingredient by name
   *
   * @param {string} name name of the ingredient
   * @return {Promise<IIngredientModel>} Promise resolved with array of match ingredients
   */
  searchByName(name: string): Promise<IIngredientModel[]>;
}

// ======================================================================
// Service
// ======================================================================
export type IngredientServiceProp = {
  repo: IIngredientRepository;
  logger: ILogger;
  serviceCache: ServiceCache;
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IIngredientService extends IBaseService<IIngredientModel> {
  /**
   * Search ingredients by name
   *
   * @param {string} name name of the ingredient
   * @return {Promise<IIngredientModel>} Promise array of IIngredientModel
   */
  autocomplete(name: string): Promise<string[]>;
}

// ======================================================================
// Request
// ======================================================================

// ======================================================================
// Response
// ======================================================================
export type GetIngredientsRes = BaseResponse<{
  ingredients: string[];
}>;
