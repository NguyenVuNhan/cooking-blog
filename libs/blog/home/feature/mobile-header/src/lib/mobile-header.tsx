import { AnimatePresence, motion } from 'framer-motion';
import CloseIcon from '@material-ui/icons/Close';
import {
  SidebarSearch,
  SidebarSearchProps,
} from '@cookingblog/blog/home/ui/components';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import MobileDrawer from './mobile-drawer/mobile-drawer';

/* eslint-disable-next-line */
export interface MobileHeaderProps {}

export function MobileHeader(props: MobileHeaderProps) {
  const classes = useStyles();
  const [searchToggle, setSearchToggle] = useState(false);
  const history = useHistory();

  const onSearch: SidebarSearchProps['onSearch'] = ({ query }) => {
    setSearchToggle(false);
    history.push({
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
        <IconButton onClick={() => setSearchToggle(!searchToggle)}>
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

const useStyles = makeStyles((theme) => ({
  appBar: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default MobileHeader;
