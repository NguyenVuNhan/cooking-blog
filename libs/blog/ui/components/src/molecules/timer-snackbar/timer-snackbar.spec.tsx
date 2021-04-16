import { render } from '@testing-library/react';

import TimerSnackbar from './timer-snackbar';

describe('TimerSnackbar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TimerSnackbar />);
    expect(baseElement).toBeTruthy();
  });
});
