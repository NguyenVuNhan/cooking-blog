import { AnimatedRoute } from '@cookingblog/blog/ui/components/molecules';
import React, { lazy, Suspense } from 'react';
import { SideBar } from '@cookingblog/blog/home/feature/sidebar';
import { RandomRecipe } from '@cookingblog/blog/recipe/feature/random-recipe';
import { Route } from 'react-router-dom';
import { LoadingSpinner } from '@cookingblog/blog/ui/components/atoms';

/* eslint-disable-next-line */
export interface HomeShellProps {}

const routes = [
  {
    path: '/search(.*)',
    view: lazy(() => import('@cookingblog/blog/recipe/feature/search')),
    auth: false,
  },
  {
    path: '/',
    view: lazy(() => import('@cookingblog/blog/recipe/feature/random-recipe')),
    auth: false,
  },
];

export function HomeShell(props: HomeShellProps) {
  return (
    <AnimatedRoute exitBeforeEnter>
      {routes.map((route) => (
        <Route key={route.path} path={route.path} exact>
          <div className="flex w-screen h-screen overflow-hidden">
            <SideBar />
            <div className="flex-grow-1">
              <Suspense fallback={<LoadingSpinner overlay />}>
                <route.view />
              </Suspense>
            </div>
          </div>
        </Route>
      ))}
    </AnimatedRoute>
  );
}

export default HomeShell;
