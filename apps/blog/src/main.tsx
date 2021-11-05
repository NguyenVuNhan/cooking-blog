import {
  authApi,
  authReducer,
  AUTH_FEATURE_KEY,
} from '@cookingblog/blog/auth/data-access';
import { recipeApi } from '@cookingblog/blog/recipe/data-access';
import { CssBaseline } from '@mui/material';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import StylesProvider from '@mui/styles/StylesProvider';
import { configureStore } from '@reduxjs/toolkit';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import 'reflect-metadata';
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
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    authApi.middleware,
    recipeApi.middleware,
  ],
  devTools: process.env.NODE_ENV !== 'production',
  enhancers: [],
});

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <StylesProvider injectFirst>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyle />
            <App />
          </ThemeProvider>
        </StyledEngineProvider>
      </StylesProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
