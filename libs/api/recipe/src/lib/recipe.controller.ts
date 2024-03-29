import { IRecipe } from '@cookingblog/api/recipe';
import { ExtractDTO, RecipeDTO } from '@cookingblog/api/recipe/dto';
import {
  NotFoundError,
  ServerError,
  validate,
} from '@cookingblog/express/api/common';
import {
  Controller,
  RequestWithUser,
  sendSuccessResponse,
} from '@cookingblog/express/api/core';
import { Request, Response } from 'express';
import { authenticate } from 'passport';
import { IRecipeService } from './recipe.types';

export class RecipeController extends Controller {
  constructor(private recipeService: IRecipeService) {
    super('/api/recipe');
    this.setupRouter();
  }

  setupRouter() {
    this.router.get(
      `/extract`,
      authenticate('jwt', { session: false }),
      validate(ExtractDTO, { subject: 'query' }),
      this.wrapTryCatch(this.extract)
    );
    this.router.get(`/random`, this.wrapTryCatch(this.random));
    this.router.get(`/:id`, this.wrapTryCatch(this.get));
    this.router.get(`/`, this.wrapTryCatch(this.search));
    this.router.use(authenticate('jwt', { session: false }));
    this.router.delete(`/:id`, this.wrapTryCatch(this.delete));
    this.router.post(
      `/:id`,
      validate(RecipeDTO, { skipMissingProperties: true }),
      this.wrapTryCatch(this.update)
    );
    this.router.post(`/`, validate(RecipeDTO), this.wrapTryCatch(this.create));
  }

  private async random(req: Request, res: Response) {
    const result = await this.recipeService.getRandomRecipe();

    if (!result) throw new ServerError();
    sendSuccessResponse(result, res);
  }

  private async extract(req: RequestWithUser, res: Response) {
    const result = await this.recipeService.extractRecipe(
      req.user.id,
      req.query.url as string
    );

    if (!result) throw new ServerError();
    sendSuccessResponse(result, res);
  }

  private async create(req: RequestWithUser, res: Response) {
    req.body.user = req.user.id;
    const recipe = await this.recipeService.create(req.body);

    sendSuccessResponse(
      { id: recipe.id, title: recipe.title },
      res,
      'New recipe added'
    );
  }

  private async get(req: Request, res: Response) {
    const recipe = await this.recipeService.findOne({ id: req.params.id });

    if (!recipe) throw new NotFoundError('Recipe not found');
    sendSuccessResponse(recipe, res);
  }

  private async search(req: Request, res: Response) {
    const { query, ...rest } = req.query;
    const recipes = await this.recipeService.search(
      query as string,
      rest as unknown as IRecipe
    );

    if (!recipes) throw new NotFoundError('Recipe not found');
    sendSuccessResponse({ recipes }, res);
  }

  private async update(req: RequestWithUser, res: Response) {
    const result = await this.recipeService.updateRecipe(
      req.user.id,
      req.params.id,
      req.body
    );

    if (!result) throw new ServerError();
    sendSuccessResponse({ id: result.id, title: result.title }, res);
  }

  private async delete(req: RequestWithUser, res: Response) {
    const id = req.params.id;
    const result = await this.recipeService.deleteRecipe(req.user.id, id);

    if (!result) throw new ServerError();
    sendSuccessResponse({ id }, res);
  }
}
