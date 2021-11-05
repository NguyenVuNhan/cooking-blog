import { IRecipe } from '@cookingblog/api/recipe';
import {
  ShoppingListCtx,
  ShoppingListItem,
} from '@cookingblog/blog/shopping-list/data-access';
import { Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';
import React, { FC, useEffect, useState } from 'react';

export const ShoppingListProvider: FC = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>([]);
  const [snackOpen, setSnackOpen] = React.useState(false);

  useEffect(() => {
    try {
      const serializedState = localStorage.getItem('shoppingList');
      if (!serializedState) return;
      const localList: ShoppingListItem[] = JSON.parse(serializedState);
      setShoppingList(localList);
    } catch (err) {
      return;
    }
  }, []);

  const localSave = (list: ShoppingListItem[]) => {
    try {
      const serializedState = JSON.stringify(list);
      localStorage.setItem('shoppingList', serializedState);
    } catch (err) {
      return;
    }
  };

  const openShoppingList = () => setOpen(true);

  const closeShoppingList = () => setOpen(false);

  const addOneToShoppingList = (
    item: string,
    recipe: string,
    quantity: string
  ) => {
    const description = quantity ?? item;
    const newList = [
      ...shoppingList,
      { item, recipe, description, checked: false },
    ];
    setShoppingList(newList);
    setSnackOpen(true);
    localSave(newList);
  };

  const addAllToShoppingList = (recipe: IRecipe) => {
    const newItems = recipe.ingredients.map(({ ingredient, quantity }) => {
      const description = quantity
        ? `${quantity} of ${ingredient}`
        : ingredient;
      return {
        item: ingredient,
        recipe: recipe.title,
        description,
        checked: false,
      };
    });
    const newList = [...shoppingList, ...newItems];
    setShoppingList(newList);
    setSnackOpen(true);
    localSave(newList);
  };

  const clearShoppingList = () => {
    setShoppingList([]);
    localSave([]);
  };

  const removeItem = (recipe: string, ingredient?: string) => {
    const newList = shoppingList.filter(
      (item) =>
        !(
          item.recipe === recipe &&
          (ingredient ? item.item === ingredient : true)
        )
    );
    setShoppingList([...newList]);
    localSave(newList);
  };

  const handleSnackClose = (_event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') return;
    setSnackOpen(false);
  };

  return (
    <ShoppingListCtx.Provider
      value={{
        open,
        openShoppingList,
        closeShoppingList,
        shoppingList,
        addOneToShoppingList,
        addAllToShoppingList,
        clearShoppingList,
        removeItem,
      }}
    >
      {children}
      <Snackbar
        open={snackOpen}
        autoHideDuration={1000}
        onClose={handleSnackClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleSnackClose} severity="success">
          New item added to shopping list
        </Alert>
      </Snackbar>
    </ShoppingListCtx.Provider>
  );
};

export default ShoppingListProvider;
