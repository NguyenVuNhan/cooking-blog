import {
  authReducer,
  AUTH_FEATURE_KEY,
} from '@cookingblog/blog/data-access/store/auth';
import {
  recipeReducer,
  RECIPE_FEATURE_KEY,
} from '@cookingblog/blog/data-access/store/recipe';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    [RECIPE_FEATURE_KEY]: recipeReducer,
    [AUTH_FEATURE_KEY]: authReducer,
  },
  // Additional middleware can be passed to this array
  middleware: [...getDefaultMiddleware()],
  devTools: process.env.NODE_ENV !== 'production',
  enhancers: [],
});

export * from './auth';
export * from './recipe';
export default store;
