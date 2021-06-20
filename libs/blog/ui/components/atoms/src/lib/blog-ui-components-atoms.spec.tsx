import { render } from '@testing-library/react';

import BlogUiComponentsAtoms from './blog-ui-components-atoms';

describe('BlogUiComponentsAtoms', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BlogUiComponentsAtoms />);
    expect(baseElement).toBeTruthy();
  });
});
