import { render } from '@testing-library/react';

import BlogUiError from './blog-ui-error';

describe('BlogUiError', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BlogUiError />);
    expect(baseElement).toBeTruthy();
  });
});
