import { render } from '@testing-library/react';

import BlogComponents from './blog-components';

describe('BlogComponents', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BlogComponents />);
    expect(baseElement).toBeTruthy();
  });
});
