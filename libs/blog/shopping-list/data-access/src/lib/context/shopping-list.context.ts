import { IRecipe } from '@cookingblog/api/recipe';
import { createContext } from 'react';

export interface ShoppingListItem {
  item: string;
  recipe: string;
  checked: boolean;
  description: string;
}

interface ShoppingListContextType {
  open: boolean;
  openShoppingList: () => void;
  closeShoppingList: () => void;
  addOneToShoppingList: (
    item: string,
    recipe: string,
    description: string
  ) => void;
  addAllToShoppingList: (recipe: IRecipe) => void;
  clearShoppingList: () => void;
  removeItem: (recipe: string, ingredient?: string) => void;
  shoppingList: ShoppingListItem[];
}

export const ShoppingListCtx = createContext<ShoppingListContextType>({
  open: false,
  openShoppingList: () => {
    return;
  },
  closeShoppingList: () => {
    return;
  },
  addOneToShoppingList: () => {
    return;
  },
  addAllToShoppingList: () => {
    return;
  },
  clearShoppingList: () => {
    return;
  },
  removeItem: () => {
    return;
  },
  shoppingList: [],
});
