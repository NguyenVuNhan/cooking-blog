import { Recipe } from '@api/models';
import { IRecipeModel, SearchRecipeRes } from '@cookingblog/api-interfaces';
import { APIError } from '@cookingblog/shared/exception';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

class SearchRecipe {
  static perform = [
    async (
      req: Request<undefined, SearchRecipeRes, undefined, { query: string }>,
      res: Response<SearchRecipeRes>,
      next: NextFunction
    ) => {
      const query = req.query.query;

      let recipes: IRecipeModel[];
      if (query) {
        console.log(query);
        recipes = await Recipe.find(
          {
            $text: { $search: query },
          },
          { score: { $meta: 'textScore' } }
        ).sort('score');
      } else {
        recipes = await Recipe.find().sort('title').exec();
      }

      if (!recipes) {
        return next(
          new APIError('No recipe found', { status: StatusCodes.NOT_FOUND })
        );
      }

      return res.status(200).json({
        data: { recipes } as SearchRecipeRes['data'],
        message: 'List recipe',
        success: true,
      });
    },
  ];
}

export default SearchRecipe;
