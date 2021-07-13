import {
  ShoppingListCtx,
  ShoppingListItem,
} from '@cookingblog/blog/shopping-list/data-access';
import { List } from '@material-ui/core';
import React, { useContext, useMemo } from 'react';
import AislesViewItem from '../aisles-view-item/aisles-view-item';
import ListItemAnimation from '../list-item-animation/list-item-animation';

interface ShoppingList {
  [key: string]: ShoppingListItem[];
}

/* eslint-disable-next-line */
export interface AislesViewProps {}

export function AislesView(props: AislesViewProps) {
  const { shoppingList } = useContext(ShoppingListCtx);

  const data = useMemo<[string, ShoppingListItem[]][]>(
    () =>
      Object.entries(
        shoppingList.reduce((prev, curr) => {
          if (prev[curr.item] !== undefined) {
            prev[curr.item].push(curr);
          } else {
            prev[curr.item] = [curr];
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
          <AislesViewItem label={label} shoppingListItems={items} />
        )}
      />
    </List>
  );
}

export default AislesView;
