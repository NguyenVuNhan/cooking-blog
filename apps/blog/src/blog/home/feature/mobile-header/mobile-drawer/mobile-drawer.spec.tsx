import { render } from '@testing-library/react';

import MobileDrawer from './mobile-drawer';

describe('MobileDrawer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MobileDrawer />);
    expect(baseElement).toBeTruthy();
  });
});
