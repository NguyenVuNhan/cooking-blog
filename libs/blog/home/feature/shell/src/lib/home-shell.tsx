import { MobileHeader } from '@cookingblog/blog/home/feature/mobile-header';
import { SideBar } from '@cookingblog/blog/home/feature/sidebar';
import { LoadingSpinner } from '@cookingblog/blog/shared/ui/components/atoms';
import { AnimatedRoute } from '@cookingblog/blog/shared/ui/components/molecules';
import { lazy, Suspense } from 'react';
import { Navigate, Route } from 'react-router-dom';

const routes = [
  {
    path: '/search*',
    view: lazy(() => import('@cookingblog/blog/recipe/feature/search')),
    auth: false,
  },
  {
    path: '/',
    view: lazy(() => import('@cookingblog/blog/recipe/feature/random-recipe')),
    auth: false,
  },
];

export function HomeShell() {
  return (
    <AnimatedRoute exitBeforeEnter>
      {routes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            <div className="flex flex-col md:flex md:flex-row w-screen h-screen overflow-hidden">
              <SideBar />
              <MobileHeader />
              <div className="overflow-y-auto flex-grow-1">
                <Suspense fallback={<LoadingSpinner />}>
                  <route.view />
                </Suspense>
              </div>
            </div>
          }
        />
      ))}
      <Route element={<Navigate to="/" />} />
    </AnimatedRoute>
  );
}

export default HomeShell;
