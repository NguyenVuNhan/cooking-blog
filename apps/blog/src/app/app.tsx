import { LoadingSpinner } from '@cookingblog/blog/shared/ui/components/atoms';
import { ShoppingListProvider } from '@cookingblog/blog/shopping-list/feature/provider';
import { ShoppingCart } from '@cookingblog/blog/shopping-list/feature/shopping-cart';
import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const AuthShell = lazy(() => import('@cookingblog/blog/auth/feature/shell'));
const RecipeShell = lazy(
  () => import('@cookingblog/blog/recipe/feature/shell')
);
const HomeShell = lazy(() => import('@cookingblog/blog/home/feature/shell'));

export const App = () => {
  return (
    <Suspense fallback={<LoadingSpinner overlay />}>
      <ShoppingListProvider>
        <Routes>
          <Route path="auth/*" element={<AuthShell />} />
          <Route path="recipe/*" element={<RecipeShell />} />
          <Route path="/*" element={<HomeShell />} />
        </Routes>
        <ShoppingCart />
      </ShoppingListProvider>
    </Suspense>
  );
};

export default App;
