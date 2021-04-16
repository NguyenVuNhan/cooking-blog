import { render } from '@testing-library/react';

import RecipeTemplate from './recipe-template';

describe('RecipeTemplate', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RecipeTemplate />);
    expect(baseElement).toBeTruthy();
  });
});
