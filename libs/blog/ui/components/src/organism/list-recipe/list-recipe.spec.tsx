import { render } from '@testing-library/react';

import ListRecipe from './list-recipe';

describe('ListRecipe', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ListRecipe />);
    expect(baseElement).toBeTruthy();
  });
});
