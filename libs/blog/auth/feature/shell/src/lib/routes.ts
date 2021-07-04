import { lazy } from 'react';

export const routes = [
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
