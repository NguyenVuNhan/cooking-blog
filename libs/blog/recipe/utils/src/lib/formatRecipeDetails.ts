import { IRecipe } from '@cookingblog/api/recipe';

export const formatRecipeDetails = (recipe: IRecipe) => {
  let details = `{recipe?.ingredients.length} ingredients - {recipe?.duration} -{' '} {recipe?.serving} serving`;
};
