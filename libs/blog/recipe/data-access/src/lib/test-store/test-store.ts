import { recipeReducer, RECIPE_FEATURE_KEY } from '../store/recipe.slice';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

export const recipeTestStore = configureStore({
  reducer: {
    [RECIPE_FEATURE_KEY]: recipeReducer,
  },
  // Additional middleware can be passed to this array
  middleware: [...getDefaultMiddleware()],
  devTools: false,
  enhancers: [],
});
