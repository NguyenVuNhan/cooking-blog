import { IRecipeIngredient } from '@cookingblog/api/recipe';

export const transformIngredients = (ingredients: IRecipeIngredient[]) => {
  return ingredients.map((ingredient) => ({
    ...ingredient,
    ingredient: ingredient.ingredient_name,
  }));
};
