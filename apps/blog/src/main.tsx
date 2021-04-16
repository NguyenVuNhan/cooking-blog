import {
  authReducer,
  AUTH_FEATURE_KEY,
  recipeReducer,
  RECIPE_FEATURE_KEY,
} from '@cookingblog/blog/data-access/store';
import { history } from '@cookingblog/blog/utils';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import App from './app/app';

const store = configureStore({
  reducer: {
    [RECIPE_FEATURE_KEY]: recipeReducer,
    [AUTH_FEATURE_KEY]: authReducer,
  },
  // Additional middleware can be passed to this array
  middleware: [...getDefaultMiddleware()],
  devTools: process.env.NODE_ENV !== 'production',
  enhancers: [],
});

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
