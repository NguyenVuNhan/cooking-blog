import { BaseService } from '@cookingblog/express/api/core';
import { IIngredientModel } from './ingredient.entity';
import {
  IIngredientRepository,
  IIngredientService,
  IngredientServiceProp,
} from './ingredient.types';

export class IngredientService
  extends BaseService<IIngredientModel>
  implements IIngredientService {
  repo: IIngredientRepository;
  constructor({ repo, logger, serviceCache }: IngredientServiceProp) {
    super(repo, serviceCache, logger);
  }

  async autocomplete(name: string): Promise<string[]> {
    const ingredients = (await this.searchByName(name)).map(({ name }) => name);

    return ingredients;
  }

  private async searchByName(name: string) {
    const ingredients = await this.repo.searchByName(name);
    return ingredients;
  }
}
