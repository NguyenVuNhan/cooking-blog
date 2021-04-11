import { Recipe } from '@api/models';
import { IRecipeModel } from '@cookingblog/api-interfaces';
import { APIError } from '@utils/exception';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

class SearchRecipe {
  static perform = [
    async (req: Request, res: Response, next: NextFunction) => {
      const query = req.query.query as string;

      let recipes: IRecipeModel[];
      if (query) {
        recipes = await Recipe.find(
          {
            $text: { $search: query },
          },
          { score: { $meta: 'textScore' } }
        )
          .sort('score')
          .populate('ingredients.ingredient')
          .exec();
      } else {
        recipes = await Recipe.find().sort('title').exec();
      }

      if (!recipes) {
        return next(
          new APIError('No recipe found', { status: StatusCodes.NOT_FOUND })
        );
      }

      return res.status(200).json({
        data: { recipes },
        message: 'List recipe',
        success: true,
      });
    },
  ];
}

export default SearchRecipe;
