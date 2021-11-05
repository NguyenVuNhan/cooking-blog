import {
  authActions,
  getAuthenticated,
  getUser,
} from '@cookingblog/blog/auth/data-access';
import { ImportRecipeModal } from '@cookingblog/blog/shared/feature/import-recipe-modal';
import { ShoppingListCtx } from '@cookingblog/blog/shopping-list/data-access';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddIcon from '@mui/icons-material/Add';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import {
  Avatar,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Theme,
  Typography,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

/* eslint-disable-next-line */
export interface MobileDrawerProps {}

export function MobileDrawer(props: MobileDrawerProps) {
  const classes = useStyles();
  const navigate = useNavigate();
  const { openShoppingList } = useContext(ShoppingListCtx);
  const [open, setOpen] = useState(false);
  const [importRecipeOpen, setImportRecipeOpen] = useState(false);
  const user = useSelector(getUser);
  const authenticated = useSelector(getAuthenticated);

  const dispatch = useDispatch();
  const onAuth = () => {
    if (authenticated) return dispatch(authActions.logout());
    navigate('/auth/login');
  };

  return (
    <>
      <IconButton onClick={() => setOpen(true)} size="large">
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
              <ListItem button onClick={() => navigate('/recipe/add')}>
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

const useStyles = makeStyles((theme: Theme) => ({
  avatar: {
    marginRight: theme.spacing(2),
    width: '80px',
    height: '80px',
  },
}));

export default MobileDrawer;
