import 'reflect-metadata';

import {
  authReducer,
  AUTH_FEATURE_KEY,
} from '@cookingblog/blog/auth/data-access';
import {
  recipeReducer,
  RECIPE_FEATURE_KEY,
} from '@cookingblog/blog/recipe/data-access';
import { history } from '@cookingblog/blog/utils';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import App from './app/app';
import './styles.scss';

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

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
