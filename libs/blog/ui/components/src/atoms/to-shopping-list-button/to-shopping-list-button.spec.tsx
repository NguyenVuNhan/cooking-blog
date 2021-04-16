import { render } from '@testing-library/react';

import ToShoppingListButton from './to-shopping-list-button';

describe('ToShoppingListButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ToShoppingListButton />);
    expect(baseElement).toBeTruthy();
  });
});
