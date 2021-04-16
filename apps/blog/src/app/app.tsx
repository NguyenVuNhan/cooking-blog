import { ShoppingListProvider } from '@cookingblog/blog/data-access/context';
import { authSelector } from '@cookingblog/blog/data-access/store';
import { LoadingSpinner, ShoppingList } from '@cookingblog/blog/ui/components';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import React, { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import GlobalStyle from './GlobalStyle';
import theme from './theme';

const routes = [
  {
    path: '/register',
    view: lazy(() => import('@cookingblog/blog/ui/views/register/register')),
    auth: false,
  },
  {
    path: '/login',
    view: lazy(() => import('@cookingblog/blog/ui/views/login/login')),
    auth: false,
  },
  {
    path: '/recipe/add',
    view: lazy(
      () => import('@cookingblog/blog/ui/views/add-recipe/add-recipe')
    ),
    auth: true,
  },
  {
    path: '/recipe/search(.*)',
    view: lazy(
      () => import('@cookingblog/blog/ui/views/recipe-search/recipe-search')
    ),
    auth: false,
  },
  {
    path: '/recipe/:id',
    view: lazy(
      () => import('@cookingblog/blog/ui/views/view-recipe/view-recipe')
    ),
    auth: false,
  },
  {
    path: '/',
    view: lazy(() => import('@cookingblog/blog/ui/views/home/home')),
    auth: false,
  },
];

export const App = () => {
  const isAuthenticated = useSelector(authSelector.authenticated);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyle />
      <ShoppingListProvider>
        <Switch>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} exact>
              {!route.auth || isAuthenticated ? (
                <Suspense fallback={<LoadingSpinner />}>
                  <route.view />
                </Suspense>
              ) : (
                <Redirect key={route.path} to="/login" />
              )}
            </Route>
          ))}
          <Redirect to={isAuthenticated ? '/' : '/login'} />
        </Switch>
        <ShoppingList />
      </ShoppingListProvider>
    </MuiThemeProvider>
  );
};

export default App;
