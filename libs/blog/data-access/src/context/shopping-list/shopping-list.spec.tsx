import { render } from '@testing-library/react';

import ShoppingList from './shopping-list';

describe('ShoppingList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ShoppingList />);
    expect(baseElement).toBeTruthy();
  });
});
