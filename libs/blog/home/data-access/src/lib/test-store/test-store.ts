import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

export const homeTestStore = configureStore({
  reducer: {},
  // Additional middleware can be passed to this array
  middleware: [...getDefaultMiddleware()],
  devTools: false,
  enhancers: [],
});
