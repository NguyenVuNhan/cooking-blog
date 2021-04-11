import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import { param } from 'express-validator';
import { APIError } from '@utils/exception';
import { exception } from '@api/middlewares';
import { Recipe } from '@api/models';

class DeleteRecipe {
  static perform = [
    param('id', 'Recipe id must be given').isString(),
    exception.validatorHandler,
    async (req: Request, res: Response, next: NextFunction) => {
      const id = req.params.id;

      const recipe = await Recipe.findById(id);

      // Check if recipe exist
      if (!recipe) {
        return next(
          new APIError('No recipe found', { status: StatusCodes.NOT_FOUND })
        );
      }

      // Check if  current user is the recipe owner
      if (recipe.user.toString() !== req.user.id) {
        return next(
          new APIError('This recipe does not belongs to the current user', {
            status: StatusCodes.UNAUTHORIZED,
          })
        );
      }

      // Delete recipe
      const deletedRecipe = await recipe.delete();

      return res.status(200).json({
        data: {
          id: deletedRecipe.id,
          title: deletedRecipe.title,
        },
        message: 'Recipe successfully deleted',
        success: true,
      });
    },
  ];
}

export default DeleteRecipe;
