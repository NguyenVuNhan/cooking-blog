import { LoadingSpinner } from '@cookingblog/blog/shared/ui/components/atoms';
import { makeStyles } from '@material-ui/core/styles';
import { motion } from 'framer-motion';
import React, { lazy, Suspense } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AnimatedRoute } from '@cookingblog/blog/shared/ui/components/molecules';
import { routes } from './routes';
import { useSelector } from 'react-redux';
import { getAuthenticated } from '@cookingblog/blog/auth/data-access';

export interface AuthRoutesProps {}

export function AuthRoutes(props: AuthRoutesProps) {
  const isAuthenticated = useSelector(getAuthenticated);
  const classes = useStyle();

  return (
    <AnimatedRoute exitBeforeEnter>
      {routes.map((route, index) => (
        <Route key={index} path={`/auth${route.path}`} exact>
          {!isAuthenticated ? (
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
            <Redirect to="/" />
          )}
        </Route>
      ))}
      <Route render={() => <Redirect to="/" />} />
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
