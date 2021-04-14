import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';

import App from './app/app';

import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import { AUTH_FEATURE_KEY, authReducer } from '@cookingblog/blog/data-access';

import {
  RECIPE_FEATURE_KEY,
  recipeReducer,
} from '@cookingblog/blog/data-access';

const store = configureStore({
  reducer: {
    [RECIPE_FEATURE_KEY]: recipeReducer,
    [AUTH_FEATURE_KEY]: authReducer,
  },
  // Additional middleware can be passed to this array
  middleware: [...getDefaultMiddleware()],
  devTools: process.env.NODE_ENV !== 'production',
  // Optional Redux store enhancers
  enhancers: [],
});

ReactDOM.render(
  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>,
  document.getElementById('root')
);
