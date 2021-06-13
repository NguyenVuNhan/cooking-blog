import {
  authReducer,
  AUTH_FEATURE_KEY,
} from '@cookingblog/blog/auth/data-access';
import {
  recipeReducer,
  RECIPE_FEATURE_KEY,
} from '@cookingblog/blog/recipe/data-access';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { cleanup, render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './app';

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

describe('App', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render successfully', async () => {
    const { baseElement } = render(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    );

    expect(baseElement).toBeTruthy();
  });
});
