import { getAuthenticated } from '@cookingblog/blog/auth/data-access';
import { LoadingSpinner } from '@cookingblog/blog/shared/ui/components/atoms';
import { AnimatedRoute } from '@cookingblog/blog/shared/ui/components/molecules';
import { motion } from 'framer-motion';
import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { routes } from './routes';

/* eslint-disable-next-line */
export interface RecipeShellProps {}

export function RecipeShell(props: RecipeShellProps) {
  const isAuthenticated = useSelector(getAuthenticated);

  return (
    <div className="overflow-y-hidden">
      <Switch>
        {routes.map((route, index) => (
          <Route key={index} path={`/recipe${route.path}`} exact>
            <Suspense fallback={<LoadingSpinner />}>
              {!route.auth || isAuthenticated ? (
                <route.view />
              ) : (
                <Redirect key={route.path} to="/auth/login" />
              )}
            </Suspense>
          </Route>
        ))}
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </div>
  );
}

export default RecipeShell;
