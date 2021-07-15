import { GetRecipeRes } from '@cookingblog/api/interfaces';
import { IngredientDTO } from '@cookingblog/api/recipe/dto';

export const mapIngredients = (
  ingredients: GetRecipeRes['data']['ingredients']
): IngredientDTO[] =>
  ingredients.map((val) => ({
    ...val,
    ingredient: val.ingredient_name,
    quantity: val.quantity + (val.unit ?? ''),
  }));
