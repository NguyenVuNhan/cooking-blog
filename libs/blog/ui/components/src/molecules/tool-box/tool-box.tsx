import { ShoppingListCtx } from '@cookingblog/blog/data-access/context';
import { authActions, authSelector } from '@cookingblog/blog/data-access/store';
import { forwardTo } from '@cookingblog/blog/utils';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AddIcon from '@material-ui/icons/Add';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export interface ToolBoxProps {
  hidden?: boolean;
}

export function ToolBox(props: ToolBoxProps) {
  const { hidden } = props;

  const classes = useStyles();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(authSelector.authenticated);
  const [open, setOpen] = React.useState(false);
  const { openShoppingList } = useContext(ShoppingListCtx);

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
    <>
      <Backdrop open={open} style={{ zIndex: 10 }} />
      <SpeedDial
        ariaLabel="Tool Box"
        className={classes.speedDial}
        hidden={hidden}
        icon={<MenuIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
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
            onClick={() => forwardTo('/login')}
          />
        )}
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
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  speedDial: {
    position: 'absolute',
    zIndex: 20,
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

export default ToolBox;
