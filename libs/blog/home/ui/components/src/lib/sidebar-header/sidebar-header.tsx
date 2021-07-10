import {
  authActions,
  getAuthenticated,
  getUser,
} from '@cookingblog/blog/auth/data-access';
import { forwardTo } from '@cookingblog/blog/utils';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

/* eslint-disable-next-line */
export interface SidebarHeaderProps {}

export function SidebarHeader(props: SidebarHeaderProps) {
  const authenticated = useSelector(getAuthenticated);
  const user = useSelector(getUser);

  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(authActions.logout());
    forwardTo('/');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Avatar src="/assets/default/avatar.png" className="mr-1" />
        {!authenticated ? (
          <Link to="/auth/login">
            <Typography variant="h6">
              {user?.name ?? 'Anonymous User'}
            </Typography>
          </Link>
        ) : (
          <>
            <Typography className="flex-grow-1" variant="h6">
              {user?.name ?? 'Anonymous User'}
            </Typography>
            <IconButton onClick={onLogout} size="small">
              <ExitToAppIcon className="text-white" color="inherit" />
            </IconButton>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default SidebarHeader;
