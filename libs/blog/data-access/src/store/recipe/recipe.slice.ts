import {
  ErrorRes,
  IRecipe,
  SearchRecipeRes,
} from '@cookingblog/api-interfaces';
import { storeUtils } from '@cookingblog/shared/web/utils';
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import {
  addRecipe,
  deleteRecipe,
  getRecipe,
  searchRecipe,
  updateRecipe,
} from './recipe.actions';

export const RECIPE_FEATURE_KEY = 'recipe';

/*
 * Update these interfaces according to your requirements.
 */
export interface RecipeEntity {
  id: number;
}

export interface RecipeState {
  recipe?: IRecipe;
  recipes: SearchRecipeRes['data']['recipes'];
  loading: boolean;
  errors?: ErrorRes['data']['errors'];
}

export const recipeAdapter = createEntityAdapter<RecipeEntity>();

export const recipeSlice = createSlice({
  name: RECIPE_FEATURE_KEY,
  initialState: {
    loading: false,
    recipes: [],
  } as RecipeState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchRecipe.fulfilled, (state, action) => {
        state.recipes = action.payload.recipes;
      })
      .addCase(getRecipe.fulfilled, (state, action) => {
        state.recipe = action.payload;
      })
      .addMatcher(storeUtils.isFulfilledAction(RECIPE_FEATURE_KEY), (state) => {
        state.errors = undefined;
        state.loading = false;
      })
      .addMatcher(storeUtils.isPendingAction(RECIPE_FEATURE_KEY), (state) => {
        state.loading = true;
      })
      .addMatcher(
        storeUtils.isRejectedAction(RECIPE_FEATURE_KEY),
        (state, action) => {
          state.loading = false;
          state.errors = action.payload;
        }
      );
  },
});

/*
 * Export reducer for store configuration.
 */
export const recipeReducer = recipeSlice.reducer;

/*
 * Export action creators to be dispatched. For use with the `useDispatch` hook.
 */
export const recipeActions = {
  ...recipeSlice.actions,
  searchRecipe,
  addRecipe,
  updateRecipe,
  getRecipe,
  deleteRecipe,
};
