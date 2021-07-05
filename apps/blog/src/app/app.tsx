import { getAuthenticated } from '@cookingblog/blog/auth/data-access';
import { ShoppingListProvider } from '@cookingblog/blog/shopping-list/feature/provider';
import { ShoppingCart } from '@cookingblog/blog/shopping-list/feature/shopping-cart';
import { LoadingSpinner } from '@cookingblog/blog/ui/components/atoms';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import React, { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import GlobalStyle from './GlobalStyle';
import theme from './theme';

const routes = [
  {
    path: '/recipe/add(.*)',
    view: lazy(() => import('@cookingblog/blog/recipe/feature/add')),
    auth: true,
  },
  {
    path: '/recipe/:id',
    view: lazy(() => import('@cookingblog/blog/recipe/feature/view')),
    auth: false,
  },
];

const AuthShell = lazy(() => import('@cookingblog/blog/auth/feature/shell'));
const HomeShell = lazy(() => import('@cookingblog/blog/home/feature/shell'));

export const App = () => {
  const isAuthenticated = useSelector(getAuthenticated);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyle />
      <ShoppingListProvider>
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
        <Suspense fallback={<LoadingSpinner overlay />}>
          <AuthShell />
        </Suspense>
        <Suspense fallback={<LoadingSpinner overlay />}>
          <HomeShell />
        </Suspense>
        <ShoppingCart />
      </ShoppingListProvider>
    </MuiThemeProvider>
  );
};

export default App;
