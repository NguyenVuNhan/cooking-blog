import { LoadingSpinner } from '@cookingblog/blog/ui/components/atoms';
import { makeStyles } from '@material-ui/core/styles';
import { motion } from 'framer-motion';
import React, { lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';
import { AnimatedRoute } from '@cookingblog/blog/ui/components/molecules';

export interface AuthRoutesProps {}

const routes = [
  {
    path: '/login',
    view: lazy(() => import('@cookingblog/blog/auth/ui/login')),
    auth: false,
  },
  {
    path: '/register',
    view: lazy(() => import('@cookingblog/blog/auth/ui/register')),
    auth: false,
  },
  {
    path: '/password-reset/:id/:token',
    view: lazy(() => import('@cookingblog/blog/auth/ui/password-reset')),
    auth: false,
  },
  {
    path: '/password-reset',
    view: lazy(
      () => import('@cookingblog/blog/auth/ui/password-reset-request')
    ),
    auth: false,
  },
];

export function AuthRoutes(props: AuthRoutesProps) {
  const classes = useStyle();

  return (
    <AnimatedRoute exitBeforeEnter>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} exact>
          <div
            className={`${classes.background} w-screen h-screen d-flex items-center justify-center overflow-hidden`}
          >
            <motion.div
              className="w-full md:w-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: '100%' }}
              transition={{ type: 'tween', ease: 'anticipate', duration: 0.3 }}
            >
              <Suspense fallback={<LoadingSpinner overlay />}>
                <route.view />
              </Suspense>
            </motion.div>
          </div>
        </Route>
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
