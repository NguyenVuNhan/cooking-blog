import {
  ShoppingListCtx,
  ShoppingListItem,
} from '@cookingblog/blog/shopping-list/data-access';
import { List } from '@mui/material';
import React, { useContext, useMemo } from 'react';
import ListItemAnimation from '../list-item-animation/list-item-animation';
import RecipesViewItem from '../recipes-view-item/recipes-view-item';

interface ShoppingList {
  [key: string]: ShoppingListItem[];
}

/* eslint-disable-next-line */
export interface RecipesViewProps {}

export function RecipesView(props: RecipesViewProps) {
  const { shoppingList } = useContext(ShoppingListCtx);

  const data = useMemo<[string, ShoppingListItem[]][]>(
    () =>
      Object.entries(
        shoppingList.reduce((prev, curr) => {
          if (prev[curr.recipe] !== undefined) {
            prev[curr.recipe].push(curr);
          } else {
            prev[curr.recipe] = [curr];
          }
          return prev;
        }, {} as ShoppingList)
      ),
    [shoppingList]
  );

  return (
    <List>
      <ListItemAnimation
        data={data}
        render={(label, items) => (
          <RecipesViewItem label={label} shoppingListItems={items} />
        )}
      />
    </List>
  );
}

export default RecipesView;
