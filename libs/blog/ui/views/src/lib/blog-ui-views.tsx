import React from 'react';

import { Route, Link } from 'react-router-dom';

import './blog-ui-views.module.scss';

/* eslint-disable-next-line */
export interface BlogUiViewsProps {}

export function BlogUiViews(props: BlogUiViewsProps) {
  return (
    <div>
      <h1>Welcome to blog-ui-views!</h1>

      <ul>
        <li>
          <Link to="/">blog-ui-views root</Link>
        </li>
      </ul>
      <Route
        path="/"
        render={() => <div>This is the blog-ui-views root route.</div>}
      />
    </div>
  );
}

export default BlogUiViews;
