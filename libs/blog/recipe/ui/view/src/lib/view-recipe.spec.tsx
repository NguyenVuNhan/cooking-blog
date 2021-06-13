import { recipeTestStore } from '@cookingblog/blog/recipe/data-access';
import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import ViewRecipe from './view-recipe';

describe('ViewRecipe', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Provider store={recipeTestStore}>
        <Router>
          <ViewRecipe />
        </Router>
      </Provider>
    );

    expect(baseElement).toBeTruthy();
  });
});
