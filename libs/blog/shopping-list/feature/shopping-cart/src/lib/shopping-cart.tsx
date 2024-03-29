import { ShoppingListCtx } from '@cookingblog/blog/shopping-list/data-access';
import BookIcon from '@mui/icons-material/Book';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import CloseIcon from '@mui/icons-material/Close';
import ListAltIcon from '@mui/icons-material/ListAlt';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Typography,
} from '@mui/material';
import { useContext, useState } from 'react';
import ListView from './list-view';

export function ShoppingCart() {
  const { open, closeShoppingList, clearShoppingList } =
    useContext(ShoppingListCtx);
  const [view, setView] = useState<'aisles' | 'recipes'>('aisles');

  return (
    <Dialog open={open} onClose={closeShoppingList} fullWidth maxWidth="xs">
      <DialogTitle className="flex align-items-center">
        <Typography variant="h6">Your Shopping List</Typography>
        <div className="flex-grow-1"></div>
        <IconButton aria-label="close" onClick={closeShoppingList} size="large">
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
      <DialogContent>
        <ListView type={view} />
      </DialogContent>
      <Divider className="m-1" />
    </Dialog>
  );
}

export default ShoppingCart;
