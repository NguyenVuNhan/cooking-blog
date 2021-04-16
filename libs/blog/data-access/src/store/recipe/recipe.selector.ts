import { AuthState, AUTH_FEATURE_KEY } from '../auth';
import { RecipeState, RECIPE_FEATURE_KEY } from './recipe.slice';

export const state = (rootState: unknown) => rootState[RECIPE_FEATURE_KEY];

export const recipe = (rootState: unknown) =>
  (rootState[RECIPE_FEATURE_KEY] as RecipeState).recipe;

export const recipes = (rootState: unknown) =>
  (rootState[RECIPE_FEATURE_KEY] as RecipeState).recipes;

export const errors = (rootState: unknown) =>
  (rootState[RECIPE_FEATURE_KEY] as RecipeState).errors;

export const loading = (rootState: unknown) =>
  (rootState[RECIPE_FEATURE_KEY] as RecipeState).loading;

export const isOwner = (rootState: unknown) => {
  const owner = (rootState[RECIPE_FEATURE_KEY] as RecipeState).recipe?.user;
  const currentUser = (rootState[AUTH_FEATURE_KEY] as AuthState).user?.id;

  return owner === currentUser;
};
