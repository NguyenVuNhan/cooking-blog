import { act, render, waitFor } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import useDispatchInit from './useDispatchInit';
import React = require('react');
import { Provider } from 'react-redux';

export function addTodo(text) {
  return {
    type: 'ADD_TODO',
    text,
  };
}

const UseDispatchInitTestComponent = () => {
  useDispatchInit(addTodo, 'todo');
  return <p data-testid="counter">UseIntervalTestComponent</p>;
};

const mockStore = configureMockStore([]);

describe('Use Dispatch Init Hook', () => {
  it('should render and dispatch ADD_TODO action', async () => {
    const store = mockStore({ todos: [] });

    const { baseElement, unmount } = render(
      <Provider store={store}>
        <UseDispatchInitTestComponent />
      </Provider>
    );

    expect(baseElement).toBeTruthy();
    expect(store.getActions()).toEqual([{ type: 'ADD_TODO', text: 'todo' }]);
  });

  it('should be defined', () => {
    expect(useDispatchInit).toBeDefined();
  });
});
