import { render } from '@testing-library/react';

import AislesView from './aisles-view';

describe('AislesView', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AislesView />);
    expect(baseElement).toBeTruthy();
  });
});
