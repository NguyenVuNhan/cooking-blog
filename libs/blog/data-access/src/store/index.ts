// import {
//   recipeReducer,
//   RECIPE_FEATURE_KEY,
// } from '@cookingblog/blog/data-access/store/recipe';
import {
  AUTH_FEATURE_KEY,
  authReducer,
} from '@cookingblog/blog/auth/data-access';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    // [RECIPE_FEATURE_KEY]: recipeReducer,
    [AUTH_FEATURE_KEY]: authReducer,
  },
  // Additional middleware can be passed to this array
  middleware: [...getDefaultMiddleware()],
  devTools: process.env.NODE_ENV !== 'production',
  enhancers: [],
});

// export * from './recipe';
export default store;
