import { render } from '@testing-library/react';

import AuthTemplate from './auth-template';

describe('AuthTemplate', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AuthTemplate />);
    expect(baseElement).toBeTruthy();
  });
});
