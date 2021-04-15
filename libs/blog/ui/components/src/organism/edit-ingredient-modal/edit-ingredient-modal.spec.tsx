import { render } from '@testing-library/react';

import EditIngredientModal from './edit-ingredient-modal';

describe('EditIngredientModal', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EditIngredientModal />);
    expect(baseElement).toBeTruthy();
  });
});
