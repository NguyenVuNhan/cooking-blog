import { getAuthenticated } from '@cookingblog/blog/auth/data-access';
import { LoadingSpinner } from '@cookingblog/blog/shared/ui/components/atoms';
import { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { routes } from './routes';

export function RecipeShell() {
  const isAuthenticated = useSelector(getAuthenticated);

  return (
    <div className="overflow-y-hidden">
      <Routes>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={`/recipe${route.path}`}
            element={
              <Suspense fallback={<LoadingSpinner />}>
                {!route.auth || isAuthenticated ? (
                  <route.view />
                ) : (
                  <Navigate key={route.path} to="/auth/login" />
                )}
              </Suspense>
            }
          />
        ))}
        <Route element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default RecipeShell;
