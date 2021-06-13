import { recipeTestStore } from '@cookingblog/blog/recipe/data-access';
import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import RecipeSearch from './search-recipe';

describe('RecipeSearch', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Provider store={recipeTestStore}>
        <Router>
          <RecipeSearch />
        </Router>
      </Provider>
    );

    expect(baseElement).toBeTruthy();
  });
});
