import { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import {
  AddRecipeReq,
  AddRecipeRes,
  IRecipe,
} from '@cookingblog/api-interfaces';
import { APIError } from '@utils/exception';
import { Recipe, Ingredient } from '@api/models';
import { exception } from '@api/middlewares';

class AddRecipe {
  static perform = [
    body('title', 'Recipe title cannot be empty').isString(),
    body('ingredients', 'At least one ingredient must be given').isArray({
      min: 1,
    }),
    body('duration', 'Duration cannot be empty').isString(),
    body('steps', 'At least one steps must be given').isArray({ min: 1 }),
    exception.validatorHandler,
    async function (
      req: Request<undefined, AddRecipeRes, AddRecipeReq>,
      res: Response<AddRecipeRes>,
      next: NextFunction
    ): Promise<void> {
      const recipe = await Recipe.findOne({ title: req.body.title });

      // Recipe with this name already exists
      if (recipe) {
        return next(
          new APIError(`Recipe with name "${recipe.title}" already exist`)
        );
      }

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

      // Add new recipe
      const newRecipe = await new Recipe({
        ...req.body,
        user: req.user.id,
      }).save();

      res.status(200).json({
        data: { id: newRecipe.id, title: newRecipe.title },
        message: 'New recipe added',
        success: true,
      });
    },
  ];
}

export default AddRecipe;
