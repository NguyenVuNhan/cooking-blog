import { render } from '@testing-library/react';

import ErrorBadge from './error-badge';

describe('ErrorBadge', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ErrorBadge />);
    expect(baseElement).toBeTruthy();
  });
});
