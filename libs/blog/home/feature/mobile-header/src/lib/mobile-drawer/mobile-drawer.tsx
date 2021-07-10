import {
  authActions,
  getAuthenticated,
  getUser,
} from '@cookingblog/blog/auth/data-access';
import { ImportRecipeModal } from '@cookingblog/blog/feature/import-recipe-modal';
import { ShoppingListCtx } from '@cookingblog/blog/shopping-list/data-access';
import { forwardTo } from '@cookingblog/blog/utils';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AddIcon from '@material-ui/icons/Add';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

/* eslint-disable-next-line */
export interface MobileDrawerProps {}

export function MobileDrawer(props: MobileDrawerProps) {
  const [open, setOpen] = useState(false);
  const authenticated = useSelector(getAuthenticated);
  const user = useSelector(getUser);
  const classes = useStyles();
  const [importRecipeOpen, setImportRecipeOpen] = useState(false);
  const { openShoppingList } = useContext(ShoppingListCtx);

  const dispatch = useDispatch();
  const onAuth = () => {
    if (authenticated) return dispatch(authActions.logout());
    forwardTo('/auth/login');
  };

  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <MenuIcon className="text-white" />
      </IconButton>
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <div className="px-1 mt-2">
          <div className="flex justify-center">
            <Avatar
              src="/assets/default/avatar.png"
              className={classes.avatar}
            />
          </div>
          <Typography variant="h6" align="center">
            {user?.name ?? 'Anonymous User'}
          </Typography>
        </div>
        <Divider />
        <List>
          <ListItem button onClick={onAuth}>
            <ListItemIcon>
              {authenticated ? <ExitToAppIcon /> : <AccountCircleIcon />}
            </ListItemIcon>
            <ListItemText primary={authenticated ? 'Logout' : 'Login'} />
          </ListItem>
          {authenticated && (
            <>
              <ListItem button onClick={() => setImportRecipeOpen(true)}>
                <ListItemIcon>
                  <SystemUpdateAltIcon />
                </ListItemIcon>
                <ListItemText primary="Import Recipe" />
              </ListItem>
              <ListItem button onClick={() => forwardTo('/recipe/add')}>
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary="Add Recipe" />
              </ListItem>
            </>
          )}
          <ListItem button onClick={openShoppingList}>
            <ListItemIcon>
              <ShoppingBasketIcon />
            </ListItemIcon>
            <ListItemText primary="View ShoppingList" />
          </ListItem>
        </List>
      </Drawer>
      <ImportRecipeModal
        open={importRecipeOpen}
        onClose={() => setImportRecipeOpen(false)}
      />
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  avatar: {
    marginRight: theme.spacing(2),
    width: '80px',
    height: '80px',
  },
}));

export default MobileDrawer;
