import { ShoppingListCtx } from '@cookingblog/blog/shopping-list/data-access';
import { AislesView, RecipesView } from '@cookingblog/blog/shopping-list/ui';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Typography,
} from '@material-ui/core';
import BookIcon from '@material-ui/icons/Book';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import CloseIcon from '@material-ui/icons/Close';
import ListAltIcon from '@material-ui/icons/ListAlt';
import { useContext, useState } from 'react';

/* eslint-disable-next-line */
export interface ShoppingCartProps {}

export function ShoppingCart(props: ShoppingCartProps) {
  const { open, closeShoppingList, clearShoppingList } =
    useContext(ShoppingListCtx);
  const [view, setView] = useState<'aisles' | 'recipes'>('aisles');

  let listView;
  switch (view) {
    case 'aisles':
      listView = <AislesView />;
      break;
    case 'recipes':
      listView = <RecipesView />;
      break;
  }

  return (
    <Dialog open={open} onClose={closeShoppingList} fullWidth maxWidth="xs">
      <DialogTitle className="flex align-items-center" disableTypography>
        <Typography variant="h6">Your Shopping List</Typography>
        <div className="flex-grow-1"></div>
        <IconButton aria-label="close" onClick={closeShoppingList}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider className="mx-1" />
      <div className="flex align-items-center px-3">
        <Button
          color="secondary"
          startIcon={<ClearAllIcon />}
          onClick={clearShoppingList}
        >
          Remove all
        </Button>
        <div className="flex-grow-1"></div>
        <ListAltIcon
          color={view === 'recipes' ? 'disabled' : 'primary'}
          onClick={() => setView('aisles')}
        />
        <Divider orientation="vertical" flexItem className="m-1" />
        <BookIcon
          color={view === 'aisles' ? 'disabled' : 'primary'}
          onClick={() => setView('recipes')}
        />
      </div>
      <Divider className="mx-1" />
      <DialogContent>{listView}</DialogContent>
      <Divider className="m-1" />
    </Dialog>
  );
}

export default ShoppingCart;
