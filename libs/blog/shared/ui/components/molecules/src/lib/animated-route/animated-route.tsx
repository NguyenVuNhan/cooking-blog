import { AnimatePresence, AnimatePresenceProps } from 'framer-motion';
import React, { ReactNode } from 'react';
import { Switch, useLocation } from 'react-router-dom';

export interface AnimatedRouteProps extends AnimatePresenceProps {
  children?: ReactNode;
}

export function AnimatedRoute(props: AnimatedRouteProps) {
  const { children, ...rest } = props;
  const location = useLocation();

  return (
    <AnimatePresence {...rest}>
      <Switch location={location} key={location.pathname}>
        {children}
      </Switch>
    </AnimatePresence>
  );
}

export default AnimatedRoute;
