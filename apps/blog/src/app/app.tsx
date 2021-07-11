import { getAuthenticated } from '@cookingblog/blog/auth/data-access';
import { ShoppingListProvider } from '@cookingblog/blog/shopping-list/feature/provider';
import { ShoppingCart } from '@cookingblog/blog/shopping-list/feature/shopping-cart';
import { LoadingSpinner } from '@cookingblog/blog/shared/ui/components/atoms';
import React, { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';

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
const RecipeShell = lazy(
  () => import('@cookingblog/blog/recipe/feature/shell')
);
const HomeShell = lazy(() => import('@cookingblog/blog/home/feature/shell'));

export const App = () => {
  const isAuthenticated = useSelector(getAuthenticated);

  return (
    <Suspense fallback={<LoadingSpinner overlay />}>
      <ShoppingListProvider>
        <Switch>
          <Route path="/auth" component={AuthShell} />
          <Route path="/recipe" component={RecipeShell} />
          <Route path="/" component={HomeShell} />
        </Switch>
        <ShoppingCart />
      </ShoppingListProvider>
    </Suspense>
  );
};

export default App;
