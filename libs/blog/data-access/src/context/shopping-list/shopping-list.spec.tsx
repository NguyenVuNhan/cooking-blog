import { queryByTestId, render } from '@testing-library/react';
import { useContext } from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import ShoppingListProvider, { ShoppingListCtx } from './shopping-list';

const MockShoppingList = () => {
  const {
    open,
    shoppingList,
    openShoppingList,
    closeShoppingList,
    addOneToShoppingList,
    addAllToShoppingList,
    removeItem,
    clearShoppingList,
  } = useContext(ShoppingListCtx);
  return (
    <div>
      {open ? 'Shopping List Opened' : 'Shopping List Closed'}
      {shoppingList.map((item, index) => (
        <div key={index} data-testid={item.item}>
          {item.item}-{item.recipe}-{item.description}
        </div>
      ))}
      <button
        data-testid="remove-one-btn"
        onClick={() => {
          removeItem('recipe1', 'ingredient1');
        }}
      >
        Add One
      </button>
      <button data-testid="remove-all-btn" onClick={clearShoppingList}>
        Add One
      </button>
      <button
        data-testid="add-all-btn"
        onClick={() => {
          addAllToShoppingList({
            _id: '0',
            duration: '20',
            title: 'recipe1',
            steps: [],
            user: '0',
            ingredientsStr: '',
            ingredients: [
              { ingredient: 'ingredient1', quantity: '20' },
              { ingredient: 'ingredient2', quantity: '10' },
            ],
          });
        }}
      >
        Add One
      </button>
      <button
        data-testid="add-one-btn"
        onClick={() => {
          addOneToShoppingList('item', 'recipe', 'description');
        }}
      >
        Add One
      </button>
      <button
        data-testid="toggle-btn"
        onClick={open ? closeShoppingList : openShoppingList}
      >
        Toggle
      </button>
    </div>
  );
};

describe('ShoppingList', () => {
  let container;

  beforeEach(() => {
    container = render(
      <ShoppingListProvider>
        <MockShoppingList />
      </ShoppingListProvider>
    );
  });

  afterEach(() => {
    container.unmount();
    container = null;
  });

  it('should add/remove recipe items to/from shopping list', async () => {
    const addAllBtn = await container.findByTestId('add-all-btn');
    const removeAllBtn = await container.findByTestId('remove-all-btn');
    const removeOneBtn = await container.findByTestId('remove-one-btn');
    expect(container.queryAllByTestId('ingredient1').length).toBe(0);
    expect(container.queryAllByTestId('ingredient2').length).toBe(0);
    addAllBtn.click();
    expect(container.queryAllByTestId('ingredient1').length).toBe(1);
    expect(container.queryAllByTestId('ingredient2').length).toBe(1);
    removeAllBtn.click();
    expect(container.queryAllByTestId('ingredient1').length).toBe(0);
    expect(container.queryAllByTestId('ingredient2').length).toBe(0);
    addAllBtn.click();
    expect(container.queryAllByTestId('ingredient1').length).toBe(1);
    expect(container.queryAllByTestId('ingredient2').length).toBe(1);
    removeOneBtn.click();
    expect(container.queryAllByTestId('ingredient1').length).toBe(0);
    expect(container.queryAllByTestId('ingredient2').length).toBe(1);
  });

  it('should add one item to shopping list', async () => {
    const addOneBtn = await container.findByTestId('add-one-btn');
    expect(container.queryAllByTestId('item').length).toBe(0);
    addOneBtn.click();
    expect(container.queryAllByTestId('item').length).toBe(1);
    addOneBtn.click();
    expect(container.queryAllByTestId('item').length).toBe(2);
  });

  it('should toggle shopping list', async () => {
    const toggleBtn = await container.findByTestId('toggle-btn');
    expect(container.queryByText('Shopping List Closed')).toBeTruthy();
    expect(container.queryByText('Shopping List Opened')).toBeNull();
    toggleBtn.click();
    expect(container.queryByText('Shopping List Opened')).toBeTruthy();
    expect(container.queryByText('Shopping List Closed')).toBeNull();
  });

  it('should render successfully', () => {
    expect(container.baseElement).toBeTruthy();
  });
});
