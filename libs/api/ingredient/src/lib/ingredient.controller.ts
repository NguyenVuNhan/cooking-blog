import { Request, Response } from 'express';
import { Controller, sendSuccessResponse } from '@cookingblog/express/api/core';
import { IIngredientService } from './ingredient.types';

export class IngredientsController extends Controller {
  constructor(private ingredientService: IIngredientService) {
    super('/api/ingredients');
    this.setupRouter();
  }

  setupRouter() {
    this.router.get(`/:name`, this.wrapTryCatch(this.autocomplete));
  }

  private async autocomplete(req: Request, res: Response) {
    const name = req.params.name;

    const ingredients = await this.ingredientService.autocomplete(name);

    sendSuccessResponse({ ingredients }, res);
  }
}
