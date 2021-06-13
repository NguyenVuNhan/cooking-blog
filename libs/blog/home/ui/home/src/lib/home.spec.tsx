import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './home';
import { homeTestStore } from '@cookingblog/blog/home/data-access';

describe('Home', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Provider store={homeTestStore}>
        <Router>
          <Home />
        </Router>
      </Provider>
    );

    expect(baseElement).toBeTruthy();
  });
});
