import { IRecipe } from '@cookingblog/api/recipe';

export const getRecipeDetails = (recipe: IRecipe) => {
  let details = '';

  details += pleuralTransform('ingredient', recipe.ingredients.length);
  details += ' - ' + recipe.duration;
  details += ' - ' + pleuralTransform('serving', recipe.serving);

  return details;
};

const pleuralTransform = (
  wordInSingular: string,
  count: number,
  wordInPleural?: string
): string => {
  wordInSingular = wordInSingular.trim();

  switch (count) {
    case 0:
      return 'No ' + wordInSingular;
    case 1:
      return '1 ' + wordInSingular;
    default:
      if (wordInPleural) {
        return `${count} ${wordInPleural}`;
      }
      return `${count} ${wordInSingular}s` + 's';
  }
};
