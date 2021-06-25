import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import {
  authReducer,
  AUTH_FEATURE_KEY,
} from '@cookingblog/blog/auth/data-access';

export const homeTestStore = configureStore({
  reducer: {
    [AUTH_FEATURE_KEY]: authReducer,
  },
  // Additional middleware can be passed to this array
  middleware: [...getDefaultMiddleware()],
  devTools: false,
  enhancers: [],
});
