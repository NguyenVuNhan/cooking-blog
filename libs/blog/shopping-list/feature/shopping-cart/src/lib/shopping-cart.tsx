import { ShoppingListCtx } from '@cookingblog/blog/shopping-list/data-access';
import { AislesView, RecipesView } from './components';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import BookIcon from '@material-ui/icons/Book';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import CloseIcon from '@material-ui/icons/Close';
import ListAltIcon from '@material-ui/icons/ListAlt';
import React, { useContext, useState } from 'react';

/* eslint-disable-next-line */
export interface ShoppingCartProps {}

export function ShoppingCart() {
  const { open, closeShoppingList, clearShoppingList } = useContext(
    ShoppingListCtx
  );
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
