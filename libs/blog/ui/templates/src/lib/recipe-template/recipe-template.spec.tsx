import { ShoppingListProvider } from '@cookingblog/blog/data-access/context';
import { AUTH_FEATURE_KEY } from '@cookingblog/blog/data-access/store/auth';
import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import RecipeTemplate, { RecipeTemplateProps } from './recipe-template';

const mockStore = configureStore([]);

const renderTemplate = (props?: RecipeTemplateProps) => {
  const store = mockStore({
    [AUTH_FEATURE_KEY]: {
      authenticated: true,
      errors: [],
    },
  });
  return render(
    <Provider store={store}>
      <ShoppingListProvider>
        <RecipeTemplate {...props} />
      </ShoppingListProvider>
    </Provider>
  );
};

describe('RecipeTemplate', () => {
  it('should show go back btn', async () => {
    const { findByTestId } = renderTemplate({ hideGoBack: false });
    expect(await findByTestId('go-back-btn')).toBeTruthy();
  });

  it('should hide go back btn', async () => {
    const { queryByTestId } = renderTemplate({ hideGoBack: true });
    expect(queryByTestId('go-back-btn')).toBeNull();
  });

  it('should show toolbox', async () => {
    const { findByTestId } = renderTemplate({ showToolBox: true });
    expect(await findByTestId('toolbox-btn')).toBeTruthy();
  });

  it('should hide toolbox', async () => {
    const { queryByTestId } = renderTemplate({ showToolBox: false });
    expect(queryByTestId('toolbox-btn')).toBeNull();
  });

  it('should render successfully', () => {
    const { baseElement } = renderTemplate();
    expect(baseElement).toBeTruthy();
  });
});
