import {
  authActions,
  getAuthenticated,
} from '@cookingblog/blog/auth/data-access';
import { ImportRecipeModal } from '@cookingblog/blog/shared/feature/import-recipe-modal';
import { ShoppingListCtx } from '@cookingblog/blog/shopping-list/data-access';
import { forwardTo } from '@cookingblog/blog/shared/utils';
import Backdrop from '@material-ui/core/Backdrop';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AddIcon from '@material-ui/icons/Add';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export interface ToolBoxProps {
  hidden?: boolean;
}

export function ToolBox(props: ToolBoxProps) {
  const { hidden } = props;

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
    forwardTo('/');
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
              onClick={() => forwardTo('/auth/login')}
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
            onClick={() => forwardTo('/recipe/add')}
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
