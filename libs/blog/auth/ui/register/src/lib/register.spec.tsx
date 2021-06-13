import store from '@cookingblog/blog/data-access/store';
import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Register from './register';

describe('Register', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Provider store={store}>
        <Router>
          <Register />
        </Router>
      </Provider>
    );

    expect(baseElement).toBeTruthy();
  });
});
