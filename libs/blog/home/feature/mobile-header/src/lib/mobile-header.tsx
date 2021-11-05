import {
  SidebarSearch,
  SidebarSearchProps,
} from '@cookingblog/blog/home/ui/components';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { AppBar, IconButton, Theme, Toolbar, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileDrawer from './mobile-drawer/mobile-drawer';

export function MobileHeader() {
  const classes = useStyles();
  const [searchToggle, setSearchToggle] = useState(false);
  const navigate = useNavigate();

  const onSearch: SidebarSearchProps['onSearch'] = ({ query }) => {
    setSearchToggle(false);
    navigate({
      pathname: '/search',
      search: `?q=${query}`,
    });
  };

  return (
    <AppBar className={classes.appBar} position="static">
      <Toolbar>
        <MobileDrawer />
        <div className="flex-grow-1 flex-nowrap">
          <AnimatePresence>
            {searchToggle && (
              <motion.div
                className="overflow-hidden float-right"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                exit={{ width: '0%' }}
                transition={{ duration: 0.5 }}
              >
                <SidebarSearch onSearch={onSearch} />
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence initial={false}>
            {!searchToggle && (
              <motion.div
                initial={{ scale: 0, transitionDelay: 'initial' }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Typography
                  variant="h3"
                  align="center"
                  className="whitespace-nowrap"
                >
                  Cooking blog
                </Typography>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <IconButton onClick={() => setSearchToggle(!searchToggle)} size="large">
          {!searchToggle ? (
            <SearchIcon className="text-white" />
          ) : (
            <CloseIcon className="text-white" />
          )}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default MobileHeader;
