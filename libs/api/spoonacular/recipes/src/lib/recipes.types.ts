import { ILogger } from '@cookingblog/express/api/common';
import { ServiceCache } from '@cookingblog/express/api/core';

// ======================================================================
// Service
// ======================================================================
export type SpoonacularRecipesServiceProp = {
  logger: ILogger;
  serviceCache: ServiceCache;
  apiKeys: string[];
};

export interface ParseIngredientsRes {
  image: string;
  possibleUnits: string[];
  aisle: string;
  amount: number;
  unit: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ISpoonacularRecipesService {
  /**
   * @param {string} raw_data The ingredient with amount. i.e. 10 grams of sugar
   *
   * @return {Promise<ParseIngredientsRes>} Promise of parsed raw_data contain ingredient info
   */
  parseIngredients(raw_data: string): Promise<ParseIngredientsRes>;
}
