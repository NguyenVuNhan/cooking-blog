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
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ISpoonacularRecipesService {
  /**
   * @param {string} raw_data The ingredient with amount. i.e. 10 grams of sugar
   *
   * @return {Promise<ParseIngredientsRes>} Promise of parsed raw_data contain ingredient info
   */
  parseIngredients(raw_data: string): Promise<ParseIngredientsRes>;

  /**
   * @param {string} url The web site url to extract data
   *
   * @return {Promise<ExtractRes>} Promise of extracted recipe
   */
  extract(url: string): Promise<ExtractRes>;
}

// ======================================================================
// Response type
// ======================================================================
export interface ExtractRes {
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
  veryHealthy: boolean;
  cheap: boolean;
  veryPopular: boolean;
  sustainable: boolean;
  weightWatcherSmartPoints: number;
  gaps: string;
  lowFodmap: boolean;
  aggregateLikes: number;
  spoonacularScore: number;
  healthScore: number;
  pricePerServing: number;
  extendedIngredients: {
    id: number;
    aisle: string;
    image: string;
    consistency: string;
    name: string;
    nameClean: string;
    original: string;
    originalString: string;
    originalName: string;
    amount: number;
    unit: string;
    meta: string[];
    metaInformation: string[];
    measures: {
      [key: string]: { amount: number; unitShort: string; unitLong: string };
    };
  }[];
  id: number;
  title: string;
  servings: number;
  sourceUrl: string;
  image: string;
  imageType: string;
  summary: string | null;
  cuisines: string[];
  dishTypes: string[];
  diets: string[];
  occasions: string[];
  instructions: string;
  analyzedInstructions: {
    name: string;
    steps: {
      number: number;
      step: string;
      ingredients: {
        id: number;
        name: string;
        localizedName: string;
        image: string;
      }[];
      equipment: {
        id: number;
        name: string;
        localizedName: string;
        image: string;
      }[];
    }[];
  }[];
  sourceName: string | null;
  creditsText: string | null;
  originalId: string | null;
  spoonacularSourceUrl: string | null;
}

export interface ParseIngredientsRes {
  image: string;
  possibleUnits: string[];
  aisle: string;
  amount: number;
  unit: string;
}
