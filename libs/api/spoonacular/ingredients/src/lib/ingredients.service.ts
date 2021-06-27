import { SpoonacularBaseService } from '@cookingblog/api/spoonacular/base';
import {
  InformationRes,
  ISpoonacularIngredientsService,
  SpoonacularIngredientsServiceProp,
} from './ingredient.types';

export class SpoonacularIngredientsService
  extends SpoonacularBaseService
  implements ISpoonacularIngredientsService {
  constructor({
    apiKeys,
    serviceCache,
    logger,
  }: SpoonacularIngredientsServiceProp) {
    super({
      serviceCache,
      logger,
      baseUrl: `https://api.spoonacular.com/food/ingredients/`,
      apiKeys,
    });
  }

  async information(id: string | number): Promise<InformationRes> {
    const data = await this.getData<InformationRes>(
      `/${id}/information?`,
      'get',
      (data) => data.data
    );
    return data;
  }
}
