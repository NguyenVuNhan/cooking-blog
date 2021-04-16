import { render } from '@testing-library/react';

import RecipeSearch from './recipe-search';

describe('RecipeSearch', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RecipeSearch />);
    expect(baseElement).toBeTruthy();
  });
});
