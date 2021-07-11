import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ReactChild } from 'react';

export interface LoadingSpinnerProps {
  overlay?: boolean;
  children?: ReactChild;
}

export function LoadingSpinnerWrapper(props: LoadingSpinnerProps) {
  const { overlay, children } = props;

  return overlay ? (
    <Backdrop
      open
      className="h-screen w-screen flex items-center justify-center"
      style={{ zIndex: 1000 }}
    >
      {children}
    </Backdrop>
  ) : (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100%"
      minHeight="inherit"
    >
      {children}
    </Box>
  );
}

export function LoadingSpinner(props: LoadingSpinnerProps) {
  const { overlay } = props;

  return (
    <LoadingSpinnerWrapper overlay={overlay}>
      <CircularProgress />
    </LoadingSpinnerWrapper>
  );
}

export default LoadingSpinner;
