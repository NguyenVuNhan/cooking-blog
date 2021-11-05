import { lazy } from 'react';

export const routes = [
  {
    path: 'login',
    view: lazy(() => import('@cookingblog/blog/auth/feature/login')),
    auth: false,
  },
  {
    path: 'register',
    view: lazy(() => import('@cookingblog/blog/auth/feature/register')),
    auth: false,
  },
  {
    path: 'password-reset/:id/:token',
    view: lazy(() => import('@cookingblog/blog/auth/feature/password-reset')),
    auth: false,
  },
  {
    path: 'password-reset',
    view: lazy(
      () => import('@cookingblog/blog/auth/feature/password-reset-request')
    ),
    auth: false,
  },
];
