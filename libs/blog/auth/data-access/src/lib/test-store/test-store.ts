import { authReducer, AUTH_FEATURE_KEY } from '../store/auth.slice';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

export const authTestStore = configureStore({
  reducer: {
    [AUTH_FEATURE_KEY]: authReducer,
  },
  // Additional middleware can be passed to this array
  middleware: [...getDefaultMiddleware()],
  devTools: false,
  enhancers: [],
});
