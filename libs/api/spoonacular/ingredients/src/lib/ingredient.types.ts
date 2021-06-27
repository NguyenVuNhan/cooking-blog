import { ILogger } from '@cookingblog/express/api/common';
import { ServiceCache } from '@cookingblog/express/api/core';

// ======================================================================
// Service
// ======================================================================
export type SpoonacularIngredientsServiceProp = {
  logger: ILogger;
  serviceCache: ServiceCache;
  apiKeys: string[];
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ISpoonacularIngredientsService {
  /**
   * @param {string | number} id The ingredient spoonacular id
   *
   * @return {Promise<InformationRes>} Promise of ingredient detail
   */
  information(id: string | number): Promise<InformationRes>;
}

// ======================================================================
// Response type
// ======================================================================
export interface InformationRes {
  id: 9266;
  original: 'pineapples';
  originalName: 'pineapples';
  name: 'pineapples';
  nameClean: 'pineapple';
  amount: 1.0;
  unit: '';
  unitShort: '';
  unitLong: '';
  possibleUnits: string[];
  estimatedCost: { value: number; unit: string };
  consistency: string;
  shoppingListUnits: string[];
  aisle: string;
  image: string;
  meta: [];
  nutrition: {
    nutrients: {
      name: string;
      amount: number;
      unit: string;
      percentOfDailyNeeds: number;
    }[];
    properties: { name: string; amount: number; unit: string }[];
    caloricBreakdown: {
      percentProtein: number;
      percentFat: number;
      percentCarbs: number;
    };
    weightPerServing: { amount: number; unit: string };
  };
  categoryPath: string[];
}
