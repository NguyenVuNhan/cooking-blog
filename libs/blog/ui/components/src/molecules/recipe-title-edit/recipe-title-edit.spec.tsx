import { render } from '@testing-library/react';

import RecipeTitleEdit from './recipe-title-edit';

describe('RecipeTitleEdit', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RecipeTitleEdit />);
    expect(baseElement).toBeTruthy();
  });
});
