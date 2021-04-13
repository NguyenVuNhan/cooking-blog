import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { body, param } from 'express-validator';
import {
  IRecipe,
  UpdateRecipeReq,
  UpdateRecipeRes,
} from '@cookingblog/api-interfaces';
import { APIError } from '@utils/exception';
import { exception } from '@api/middlewares';
import { Recipe, Ingredient } from '@api/models';

class UpdateRecipe {
  static perform = [
    param('id', 'Recipe id must be given').isString(),
    body('ingredients', 'Invalid input').optional().isArray({ min: 1 }),
    body('steps', 'Invalid input').optional().isArray({ min: 1 }),
    exception.validatorHandler,
    async (
      req: Request<{ id: string }, UpdateRecipeRes, UpdateRecipeReq>,
      res: Response<UpdateRecipeRes>,
      next: NextFunction
    ) => {
      const id = req.params.id;

      const recipe = await Recipe.findById(id);

      // Check if recipe exist
      if (!recipe) {
        return next(
          new APIError('No recipe found', { status: StatusCodes.NOT_FOUND })
        );
      }

      // If new title was given, check whether it exist or not
      if (req.body.title && req.body.title != recipe.title) {
        const r = await Recipe.findOne({ title: req.body.title });

        // Recipe with this name already exists
        if (r) {
          return next(
            new APIError(`Recipe with name "${r.title}" already exist`)
          );
        }
      }

      // Check if  current user is the recipe owner
      if (recipe.user.toString() !== req.user.id) {
        return next(
          new APIError('This recipe does not belongs to the current user', {
            status: StatusCodes.UNAUTHORIZED,
          })
        );
      }

      // If new ingredients was given
      if (req.body.ingredients) {
        const ingredientPromises: Promise<
          IRecipe['ingredients'][number]
        >[] = req.body.ingredients.map(async (val) => {
          const name = val.ingredient.toLowerCase();
          const quantity = val.quantity;

          const ingredient = await Ingredient.findOne({ name });
          return await (ingredient
            ? { ingredient: ingredient.id, quantity }
            : new Ingredient({ name }).save().then((newIngredient) => ({
                ingredient: newIngredient.id,
                quantity,
              })));
        });

        // Run all ingredientPromises
        req.body.ingredients = await Promise.all(ingredientPromises);
        req.body.ingredientsStr = req.body.ingredients
          .map((v) => v.ingredient)
          .join(', ');
      }

      const newRecipe = { ...req.body };

      if (Object.keys(newRecipe).length === 0) {
        return res.status(200).json({
          data: {
            id: recipe.id,
            title: recipe.title,
          },
          message: 'There is nothing to update',
          success: true,
        });
      }

      await recipe.updateOne(
        { $set: newRecipe },
        { new: true, useFindAndModify: false }
      );

      return res.status(200).json({
        data: {
          id: recipe.id,
          title: newRecipe.title || recipe.title,
        },
        message: 'Recipe successfully updated',
        success: true,
      });
    },
  ];
}

export default UpdateRecipe;
