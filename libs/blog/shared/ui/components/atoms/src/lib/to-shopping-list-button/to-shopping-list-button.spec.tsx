import { render } from '@testing-library/react';
import ToShoppingListButton from './to-shopping-list-button';

describe('ToShoppingListButton', () => {
  it('should render add and remove icon correctly', () => {
    const { getByTestId, queryByTestId } = render(<ToShoppingListButton />);
    const btn = getByTestId('btn');
    btn.click();
    expect(queryByTestId('remove-icon')).toBeTruthy();
    expect(queryByTestId('add-icon')).toBeNull();
    btn.click();
    expect(queryByTestId('remove-icon')).toBeNull();
    expect(queryByTestId('add-icon')).toBeTruthy();
  });

  it('should trigger onSelect and onRemove should work in adjacent', () => {
    const onSelect = jest.fn();
    const onRemove = jest.fn();
    const { getByTestId } = render(
      <ToShoppingListButton onSelect={onSelect} onRemove={onRemove} />
    );
    const btn = getByTestId('btn');
    btn.click();
    expect(onSelect.mock.calls.length).toBe(1);
    expect(onRemove.mock.calls.length).toBe(0);
    btn.click();
    expect(onSelect.mock.calls.length).toBe(1);
    expect(onRemove.mock.calls.length).toBe(1);
    btn.click();
    expect(onSelect.mock.calls.length).toBe(2);
    expect(onRemove.mock.calls.length).toBe(1);
  });

  it('should render successfully', () => {
    const { baseElement } = render(<ToShoppingListButton />);
    expect(baseElement).toBeTruthy();
  });
});
