import { authTestStore } from '@cookingblog/blog/auth/data-access';
import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Register from './register';

describe('Register', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Provider store={authTestStore}>
        <Router>
          <Register />
        </Router>
      </Provider>
    );

    expect(baseElement).toBeTruthy();
  });
});
