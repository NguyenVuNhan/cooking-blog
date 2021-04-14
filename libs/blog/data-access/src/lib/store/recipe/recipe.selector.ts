import { RecipeState, RECIPE_FEATURE_KEY } from './recipe.slice';

export const getRecipeState = (rootState: unknown): RecipeState =>
  rootState[RECIPE_FEATURE_KEY];
