import { render } from '@testing-library/react';

import IngredientInput from './ingredient-input';

describe('IngredientInput', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<IngredientInput />);
    expect(baseElement).toBeTruthy();
  });
});
