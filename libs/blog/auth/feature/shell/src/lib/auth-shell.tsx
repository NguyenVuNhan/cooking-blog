import { getAuthenticated } from '@cookingblog/blog/auth/data-access';
import { LoadingSpinner } from '@cookingblog/blog/shared/ui/components/atoms';
import { AnimatedRoute } from '@cookingblog/blog/shared/ui/components/molecules';
import makeStyles from '@mui/styles/makeStyles';
import { motion } from 'framer-motion';
import { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route } from 'react-router-dom';
import { routes } from './routes';

export function AuthRoutes() {
  const isAuthenticated = useSelector(getAuthenticated);
  const classes = useStyle();

  return (
    <AnimatedRoute exitBeforeEnter>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={
            !isAuthenticated ? (
              <div
                className={`${classes.background} w-screen h-screen d-flex items-center justify-center overflow-hidden`}
              >
                <motion.div
                  className="w-full md:w-1/2"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, y: '100%' }}
                  transition={{
                    type: 'tween',
                    ease: 'anticipate',
                    duration: 0.3,
                  }}
                >
                  <Suspense fallback={<LoadingSpinner />}>
                    <route.view />
                  </Suspense>
                </motion.div>
              </div>
            ) : (
              <Navigate to="/" />
            )
          }
        />
      ))}
    </AnimatedRoute>
  );
}

const useStyle = makeStyles({
  background: {
    backgroundImage: `url(/assets/landing.jpg)`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
});

export default AuthRoutes;
