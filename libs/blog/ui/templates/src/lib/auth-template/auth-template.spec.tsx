import { fireEvent, render } from '@testing-library/react';
import AuthTemplate from './auth-template';

describe('AuthTemplate', () => {
  it('should trigger onSubmit', async () => {
    const onSubmit = jest.fn();
    const { getByTestId } = render(
      <AuthTemplate title="" subTitle="" onSubmit={onSubmit} />
    );
    fireEvent.submit(getByTestId('form'));
    expect(onSubmit.mock.calls.length).toBe(1);
  });

  it('should contain title', async () => {
    const { findByText } = render(
      <AuthTemplate title="title" subTitle="subTitle" />
    );
    expect(await findByText('title')).toBeTruthy();
    expect(await findByText('subTitle')).toBeTruthy();
  });

  it('should render successfully', () => {
    const { baseElement } = render(<AuthTemplate title="" subTitle="" />);
    expect(baseElement).toBeTruthy();
  });
});
