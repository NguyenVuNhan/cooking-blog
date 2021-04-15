import { render } from '@testing-library/react';

import EditStepGroup from './edit-step-group';

describe('EditStepGroup', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EditStepGroup />);
    expect(baseElement).toBeTruthy();
  });
});
