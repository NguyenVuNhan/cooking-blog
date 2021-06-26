import { render } from '@testing-library/react';

import BlogUiError from './rtk-query-error';

describe('BlogUiError', () => {
  it('should render SerializedError', async () => {
    const { baseElement, findByText } = render(
      <BlogUiError
        error={{
          name: 'Test error name',
          message: 'Test error message',
          code: '500',
        }}
      />
    );

    expect(baseElement).toBeTruthy();
    expect(await findByText('An error occurred :(')).toBeTruthy();
  });

  it('should render FetchBaseQueryError', async () => {
    const { baseElement, findByText } = render(
      <BlogUiError
        error={{
          data: {},
          status: 500,
        }}
        type="rtk"
      />
    );

    expect(baseElement).toBeTruthy();
    expect(await findByText('500 Error')).toBeTruthy();
  });

  it('should render API error', async () => {
    const { baseElement, findByText } = render(
      <BlogUiError
        error={{
          data: { message: 'Some API error' },
          status: 500,
        }}
        type="api"
      />
    );

    expect(baseElement).toBeTruthy();
    expect(await findByText('Some API error')).toBeTruthy();
  });
});
