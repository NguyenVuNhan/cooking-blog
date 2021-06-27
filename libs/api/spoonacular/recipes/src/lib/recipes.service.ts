import { SpoonacularBaseService } from '@cookingblog/api/spoonacular/base';
import {
  ExtractRes,
  ISpoonacularRecipesService,
  ParseIngredientsRes,
  SpoonacularRecipesServiceProp,
} from './recipes.types';

export class SpoonacularRecipesService
  extends SpoonacularBaseService
  implements ISpoonacularRecipesService {
  constructor({
    apiKeys,
    serviceCache,
    logger,
  }: SpoonacularRecipesServiceProp) {
    super({
      serviceCache,
      logger,
      baseUrl: `https://api.spoonacular.com/recipes`,
      apiKeys,
    });
  }

  async extract(url: string): Promise<ExtractRes> {
    const data = await this.getData<ExtractRes>(
      `/extract?url=${url}&forceExtraction=true`,
      'get',
      (data) => data.data as ExtractRes
    );

    return data;
  }

  async parseIngredients(raw_data: string): Promise<ParseIngredientsRes> {
    const params = new URLSearchParams({ ingredientList: raw_data });

    const data = this.getData<ParseIngredientsRes>(
      '/parseIngredients?',
      'post',
      (data) => data.data[0],
      params
    );
    return data;
  }
}
