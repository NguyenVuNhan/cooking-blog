import { render } from '@testing-library/react';

import AddRecipe from './add-recipe';

describe('AddRecipe', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AddRecipe />);
    expect(baseElement).toBeTruthy();
  });
});
