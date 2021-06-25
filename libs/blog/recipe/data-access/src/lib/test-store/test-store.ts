import { recipeReducer, RECIPE_FEATURE_KEY } from '../store/recipe.slice';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import {
  authReducer,
  AUTH_FEATURE_KEY,
} from '@cookingblog/blog/auth/data-access';

export const recipeTestStore = configureStore({
  reducer: {
    [AUTH_FEATURE_KEY]: authReducer,
    [RECIPE_FEATURE_KEY]: recipeReducer,
  },
  // Additional middleware can be passed to this array
  middleware: [...getDefaultMiddleware()],
  devTools: false,
  enhancers: [],
});
