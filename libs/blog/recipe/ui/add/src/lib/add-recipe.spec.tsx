import { recipeTestStore } from '@cookingblog/blog/recipe/data-access';
import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import AddRecipe from './add-recipe';

describe('AddRecipe', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Provider store={recipeTestStore}>
        <Router>
          <AddRecipe />
        </Router>
      </Provider>
    );

    expect(baseElement).toBeTruthy();
  });
});
