import {
  authActions,
  getAuthenticated,
  getUser,
} from '@cookingblog/blog/auth/data-access';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { AppBar, Avatar, IconButton, Toolbar, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

export function SidebarHeader() {
  const user = useSelector(getUser);
  const authenticated = useSelector(getAuthenticated);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(authActions.logout());
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Avatar src="/assets/default/avatar.png" />
        {!authenticated ? (
          <Link to="/auth/login" className="pl-2">
            <Typography variant="h6">
              {user?.name ?? 'Anonymous User'}
            </Typography>
          </Link>
        ) : (
          <>
            <Typography className="flex-grow-1 pl-2" variant="h6">
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
