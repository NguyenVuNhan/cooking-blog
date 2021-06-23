import { AppError } from '@cookingblog/express/api/common';
import { BaseCachingService } from '@cookingblog/express/api/core';
import axios from 'axios';
import {
  ISpoonacularRecipesService,
  ParseIngredientsRes,
  SpoonacularRecipesServiceProp,
} from './recipes.types';

export class SpoonacularRecipesService
  extends BaseCachingService
  implements ISpoonacularRecipesService {
  private baseUrl = `https://api.spoonacular.com/recipes`;
  private apiKeys: string[];

  constructor({
    apiKeys,
    serviceCache,
    logger,
  }: SpoonacularRecipesServiceProp) {
    super(serviceCache, logger);
    this.apiKeys = apiKeys;
  }

  async parseIngredients(raw_data: string) {
    const result = (await this.getCache(raw_data)) as ParseIngredientsRes;
    if (result) return result;

    const params = new URLSearchParams();
    params.append('ingredientList', raw_data);
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    // try different api key
    for (const key of this.apiKeys) {
      const url = `${this.baseUrl}/parseIngredients?apiKey=${key}`;
      this.logger.info('Calling ext api at: ' + url);

      try {
        const data = (await axios.post(url, params, config)).data[0];
        this.setCache(raw_data, JSON.stringify(data));
        return data;
      } catch {
        // Ignore errors from spoonacular
        continue;
      }
    }

    // If non of api key was working
    this.logger.warn("Spoonacular wasn't able to parse Ingredients");
    throw new AppError();
  }
}
