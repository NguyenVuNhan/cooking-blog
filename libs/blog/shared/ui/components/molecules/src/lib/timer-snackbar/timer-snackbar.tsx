import { useInterval } from '@cookingblog/shared/web/hooks';
import {
  LinearProgress,
  Snackbar,
  SnackbarCloseReason,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { SyntheticEvent, useEffect, useRef, useState } from 'react';

export interface TimerSnackbarProps {
  open: boolean;
  duration: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClose?: (event?: SyntheticEvent<any>, reason?: SnackbarCloseReason) => void;
}

const tick = 1000;

export function TimerSnackbar(props: TimerSnackbarProps) {
  const { open, onClose, duration } = props;

  const progress = useRef<number>(tick);
  const [time, setTime] = useState<{ h: number; m: number; s: number }>({
    h: 0,
    m: 0,
    s: 0,
  });

  useEffect(() => {
    progress.current = tick;
  }, [open]);

  useInterval(() => {
    progress.current = progress.current + tick;
    if (progress.current >= duration) {
      progress.current = duration;
    }
    const remain = (duration - progress.current) / 1000;
    const s = Math.ceil(remain % 60);
    const m = Math.floor((remain % (60 * 60)) / 60);
    const h = Math.floor(remain / (60 * 60));
    setTime({ h, m, s });
  }, tick);

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={open}
      autoHideDuration={duration}
      onClose={onClose}
    >
      <div>
        <Alert onClose={onClose} severity="info">
          Time out: {time.h}:{time.m}:{time.s}
        </Alert>
        <LinearProgress
          variant="determinate"
          value={(progress.current * 100) / duration}
        />
      </div>
    </Snackbar>
  );
}

export default TimerSnackbar;
