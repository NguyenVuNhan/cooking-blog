import { ShoppingListItem } from '@cookingblog/blog/shopping-list/data-access';

export interface ViewItemProps {
  label: string;
  shoppingListItems: ShoppingListItem[];
}
