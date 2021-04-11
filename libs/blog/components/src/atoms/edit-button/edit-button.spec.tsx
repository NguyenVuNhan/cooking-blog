import { render } from '@testing-library/react';

import EditButton from './edit-button';

describe('EditButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EditButton />);
    expect(baseElement).toBeTruthy();
  });
});
