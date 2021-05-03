import { render } from '@testing-library/react';
import EditButton from './edit-button';

describe('EditButton', () => {
  it('should trigger on click event', () => {
    const onClick = jest.fn();
    const { getByTestId } = render(<EditButton onClick={onClick} />);
    const btn = getByTestId('icon-btn');
    btn.click();
    expect(onClick.mock.calls.length).toBe(1);
  });

  it('should not render when show set to false', () => {
    const { queryByTestId } = render(<EditButton show={false} />);
    expect(queryByTestId('icon-btn')).toBeNull();
  });

  it('should render successfully', () => {
    const { baseElement } = render(<EditButton />);
    expect(baseElement).toBeTruthy();
  });
});
