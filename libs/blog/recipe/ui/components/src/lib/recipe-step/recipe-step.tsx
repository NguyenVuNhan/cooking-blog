import { IRecipeStep } from '@cookingblog/api/recipe';
import { strToDuration } from '@cookingblog/blog/recipe/utils';
import { TimerSnackbar } from '@cookingblog/blog/shared/ui/components/molecules';
import { mapStringMatch } from '@cookingblog/shared/utils';
import {
  Box,
  Dialog,
  Divider,
  IconButton,
  Typography,
} from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Fragment, SyntheticEvent, useCallback, useState } from 'react';

export interface RecipeStepProps {
  step: IRecipeStep;
  index: number;
}

export function RecipeStep(props: RecipeStepProps) {
  const { step, index } = props;
  const [timerOpen, setTimerOpen] = useState(false);
  const [duration, setDuration] = useState(0);
  const [timeoutOpen, setTimeoutOpen] = useState(false);

  const onTimerClose = useCallback(
    () => (_?: SyntheticEvent, reason?: string) => {
      switch (reason) {
        case 'clickaway':
          return;
        case 'timeout':
          setTimeoutOpen(true);
          break;
      }
      setTimerOpen(false);
    },
    []
  );

  const startTimer = (duration: number) => () => {
    setTimerOpen(false);
    setDuration(duration);
    setTimerOpen(true);
  };

  return (
    <Fragment>
      {timerOpen && (
        <TimerSnackbar
          onClose={onTimerClose}
          open={timerOpen}
          duration={duration}
        />
      )}

      <Dialog open={timeoutOpen} onClose={() => setTimeoutOpen(false)}>
        <Alert
          severity="warning"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setTimeoutOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          <AlertTitle>Time out</AlertTitle>
          Ding Ding Ding
        </Alert>
      </Dialog>

      <Divider variant="middle" className="my-1" />
      <Box py={2}>
        <Typography variant="h5" align="left" noWrap>
          <Box fontWeight={500}>Step {index + 1}:</Box>
        </Typography>
        <p>
          <span className="font-semibold">Ingredients:</span>{' '}
          {step.ingredients.join(', ')}
        </p>
        <Box lineHeight={2}>
          <strong>Description:</strong>
          {mapStringMatch(
            step.description,
            /(\d+\s*(?:-\s*\d+\s*)?\w+)/g,
            (val, match, i) => {
              if (!match) return val;
              const duration = strToDuration(val);
              if (duration === 0) return val;
              return (
                <Box
                  component="a"
                  bgcolor="primary.main"
                  color="white"
                  className="px-1 py-1 rounded font-semibold"
                  key={i}
                  onClick={startTimer(duration)}
                >
                  {val}
                </Box>
              );
            }
          )}
        </Box>
      </Box>
    </Fragment>
  );
}

export default RecipeStep;
