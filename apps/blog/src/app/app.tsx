import { getAuthenticated } from '@cookingblog/blog/auth/data-access';
import { LoadingSpinner } from '@cookingblog/blog/ui/components/atoms';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import React, { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import GlobalStyle from './GlobalStyle';
import theme from './theme';
import { ShoppingListProvider } from '@cookingblog/blog/shopping-list/feature/provider';
import { ShoppingCart } from '@cookingblog/blog/shopping-list/feature/shopping-cart';

const routes = [
  {
    path: '/login',
    view: lazy(() => import('@cookingblog/blog/auth/ui/login')),
    auth: false,
  },
  {
    path: '/register',
    view: lazy(() => import('@cookingblog/blog/auth/ui/register')),
    auth: false,
  },
  {
    path: '/recipe/add',
    view: lazy(() => import('@cookingblog/blog/recipe/ui/add')),
    auth: true,
  },
  {
    path: '/recipe/search(.*)',
    view: lazy(() => import('@cookingblog/blog/recipe/ui/search')),
    auth: false,
  },
  {
    path: '/recipe/:id',
    view: lazy(() => import('@cookingblog/blog/recipe/ui/view')),
    auth: false,
  },
  {
    path: '/',
    view: lazy(() => import('@cookingblog/blog/home/ui/home')),
    auth: false,
  },
];

export const App = () => {
  const isAuthenticated = useSelector(getAuthenticated);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyle />
      <ShoppingListProvider>
        <Switch>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} exact>
              {!route.auth || isAuthenticated ? (
                <Suspense fallback={<LoadingSpinner overlay />}>
                  <route.view />
                </Suspense>
              ) : (
                <Redirect key={route.path} to="/login" />
              )}
            </Route>
          ))}
          <Redirect to={isAuthenticated ? '/' : '/login'} />
        </Switch>
        <ShoppingCart />
      </ShoppingListProvider>
    </MuiThemeProvider>
  );
};

export default App;
