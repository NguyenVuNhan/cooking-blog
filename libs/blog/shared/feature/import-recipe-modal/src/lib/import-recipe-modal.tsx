import { ErrorRes } from '@cookingblog/api/interfaces';
import { useLazyExtractRecipeQuery } from '@cookingblog/blog/recipe/data-access';
import { LoadingSpinner } from '@cookingblog/blog/shared/ui/components/atoms';
import { ErrorBadge } from '@cookingblog/blog/shared/ui/components/molecules';
import { forwardTo } from '@cookingblog/blog/shared/utils';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@material-ui/core';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { useEffect, useRef } from 'react';

export interface ImportRecipeModalProps {
  open: boolean;
  onClose?: () => void;
}

export function ImportRecipeModal(props: ImportRecipeModalProps) {
  const { open, onClose } = props;
  const urlInputRef = useRef<HTMLInputElement>();

  const [trigger, { isLoading, isUninitialized, data, error }] =
    useLazyExtractRecipeQuery();

  useEffect(() => {
    if (data) {
      forwardTo(`/recipe/add?url=${urlInputRef?.current?.value}`);
    }
  }, [data]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>Import Recipe</DialogTitle>
      {isLoading && !isUninitialized && <LoadingSpinner overlay />}
      <DialogContent dividers>
        <ErrorBadge
          {...((error as FetchBaseQueryError)?.data as ErrorRes)?.data}
        />
        <TextField label="Url" inputRef={urlInputRef} fullWidth />
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          onClick={() => trigger(urlInputRef?.current?.value as string)}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ImportRecipeModal;
