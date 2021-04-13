import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import { APIError } from '@utils/exception';
import { Recipe } from '@api/models';
import { GetRecipeRes } from '@cookingblog/api-interfaces';

class ViewRecipe {
  static perform = [
    async (
      req: Request<{ id: string }, GetRecipeRes>,
      res: Response<GetRecipeRes>,
      next: NextFunction
    ) => {
      const id = req.params.id;

      let recipes = null;
      recipes = await Recipe.findById(id)
        .populate({
          path: 'ingredients',
          populate: {
            path: 'ingredient',
            select: 'name',
          },
        })
        .exec();

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

export default ViewRecipe;
