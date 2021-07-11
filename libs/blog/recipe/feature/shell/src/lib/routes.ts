import { lazy } from 'react';

export const routes = [
  {
    path: '/add(.*)',
    view: lazy(() => import('@cookingblog/blog/recipe/feature/add')),
    auth: true,
  },
  {
    path: '/:id',
    view: lazy(() => import('@cookingblog/blog/recipe/feature/view')),
    auth: false,
  },
];
