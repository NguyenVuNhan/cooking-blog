import {
  authReducer,
  AUTH_FEATURE_KEY,
} from '@cookingblog/blog/auth/data-access';
import { recipeApi } from '@cookingblog/blog/recipe/data-access';
import { history } from '@cookingblog/blog/utils';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import 'reflect-metadata';
import App from './app/app';
import './styles.scss';

export const store = configureStore({
  reducer: {
    [AUTH_FEATURE_KEY]: authReducer,
    [recipeApi.reducerPath]: recipeApi.reducer,
  },
  // Additional middleware can be passed to this array
  middleware: [...getDefaultMiddleware(), recipeApi.middleware],
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
