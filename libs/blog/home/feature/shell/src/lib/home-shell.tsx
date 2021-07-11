import { AnimatedRoute } from '@cookingblog/blog/shared/ui/components/molecules';
import React, { lazy, Suspense } from 'react';
import { SideBar } from '@cookingblog/blog/home/feature/sidebar';
import { RandomRecipe } from '@cookingblog/blog/recipe/feature/random-recipe';
import { Redirect, Route } from 'react-router-dom';
import { LoadingSpinner } from '@cookingblog/blog/shared/ui/components/atoms';
import { MobileHeader } from '@cookingblog/blog/home/feature/mobile-header';

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
          <div className="flex flex-col md:flex md:flex-row w-screen h-screen overflow-hidden">
            <SideBar />
            <MobileHeader />
            <div className="flex-grow-1 overflow-y-auto">
              <Suspense fallback={<LoadingSpinner />}>
                <route.view />
              </Suspense>
            </div>
          </div>
        </Route>
      ))}
      <Route render={() => <Redirect to="/" />} />
    </AnimatedRoute>
  );
}

export default HomeShell;
