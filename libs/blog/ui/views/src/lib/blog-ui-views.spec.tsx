import { render } from '@testing-library/react';

import BlogUiViews from './blog-ui-views';

describe('BlogUiViews', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BlogUiViews />);
    expect(baseElement).toBeTruthy();
  });
});
