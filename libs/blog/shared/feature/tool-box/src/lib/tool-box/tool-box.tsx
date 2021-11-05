import {
  authActions,
  getAuthenticated,
} from '@cookingblog/blog/auth/data-access';
import { ImportRecipeModal } from '@cookingblog/blog/shared/feature/import-recipe-modal';
import { ShoppingListCtx } from '@cookingblog/blog/shopping-list/data-access';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddIcon from '@mui/icons-material/Add';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import { Backdrop } from '@mui/material';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export interface ToolBoxProps {
  hidden?: boolean;
}

export function ToolBox({ hidden }: ToolBoxProps) {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const isAuthenticated = useSelector(getAuthenticated);
  const [open, setOpen] = useState(false);
  const { openShoppingList } = useContext(ShoppingListCtx);
  const [importRecipeOpen, setImportRecipeOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onLogout = () => {
    dispatch(authActions.logout());
    navigate('/');
  };

  return (
    <div className="fixed inset-0 flex justify-center pointer-events-none">
      <Backdrop open={open} style={{ zIndex: 10 }} />
      <div className="container relative">
        <SpeedDial
          ariaLabel="Tool Box"
          className="absolute right-1 bottom-2"
          hidden={hidden}
          icon={<MenuIcon />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
          data-testid="toolbox-btn"
        >
          {isAuthenticated ? (
            <SpeedDialAction
              icon={<ExitToAppIcon />}
              tooltipTitle="Logout"
              tooltipOpen
              open={open}
              onClick={onLogout}
            />
          ) : (
            <SpeedDialAction
              icon={<AccountCircleIcon />}
              tooltipTitle="Login"
              tooltipOpen
              open={open}
              onClick={() => navigate('/auth/login')}
            />
          )}
          <SpeedDialAction
            icon={<SystemUpdateAltIcon />}
            tooltipTitle="Import Recipe"
            tooltipOpen
            open={open}
            onClick={() => setImportRecipeOpen(true)}
          />
          <SpeedDialAction
            icon={<AddIcon />}
            tooltipTitle="Add Recipe"
            tooltipOpen
            open={open}
            onClick={() => navigate('/recipe/add')}
          />
          <SpeedDialAction
            icon={<ShoppingBasketIcon />}
            tooltipTitle="View ShoppingList"
            tooltipOpen
            open={open}
            onClick={() => {
              openShoppingList();
              handleClose();
            }}
          />
        </SpeedDial>
      </div>
      <ImportRecipeModal
        open={importRecipeOpen}
        onClose={() => setImportRecipeOpen(false)}
      />
    </div>
  );
}

export default ToolBox;
