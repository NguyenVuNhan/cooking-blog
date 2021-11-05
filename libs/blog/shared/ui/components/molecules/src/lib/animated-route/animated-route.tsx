import { AnimatePresence, AnimatePresenceProps } from 'framer-motion';
import { ReactNode } from 'react';
import { Routes, useLocation } from 'react-router-dom';

export interface AnimatedRouteProps extends AnimatePresenceProps {
  children?: ReactNode;
}

export function AnimatedRoute(props: AnimatedRouteProps) {
  const { children, ...rest } = props;
  const location = useLocation();

  return (
    <AnimatePresence {...rest}>
      {/* <Routes location={location} key={location.pathname}> */}
      {children}
      {/* </Routes> */}
    </AnimatePresence>
  );
}

export default AnimatedRoute;
