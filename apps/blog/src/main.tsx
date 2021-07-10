import 'reflect-metadata';
import {
  authApi,
  authReducer,
  AUTH_FEATURE_KEY,
} from '@cookingblog/blog/auth/data-access';
import { recipeApi } from '@cookingblog/blog/recipe/data-access';
import { history } from '@cookingblog/blog/utils';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, StylesProvider } from '@material-ui/core/styles';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import App from './app/app';
import GlobalStyle from './app/GlobalStyle';
import theme from './app/theme';
import './styles.scss';

export const store = configureStore({
  reducer: {
    [AUTH_FEATURE_KEY]: authReducer,
    [authApi.reducerPath]: authApi.reducer,
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
      <StylesProvider injectFirst>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <GlobalStyle />
          <App />
        </MuiThemeProvider>
      </StylesProvider>
    </Router>
  </Provider>,
  document.getElementById('root')
);
