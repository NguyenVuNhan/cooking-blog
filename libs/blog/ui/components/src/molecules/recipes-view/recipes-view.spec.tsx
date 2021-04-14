import { render } from '@testing-library/react';

import RecipesView from './recipes-view';

describe('RecipesView', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RecipesView />);
    expect(baseElement).toBeTruthy();
  });
});
