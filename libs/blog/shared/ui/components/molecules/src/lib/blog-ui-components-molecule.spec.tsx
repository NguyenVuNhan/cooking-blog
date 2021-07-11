import { render } from '@testing-library/react';

import BlogUiComponentsMolecule from './blog-ui-components-molecule';

describe('BlogUiComponentsMolecule', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BlogUiComponentsMolecule />);
    expect(baseElement).toBeTruthy();
  });
});
