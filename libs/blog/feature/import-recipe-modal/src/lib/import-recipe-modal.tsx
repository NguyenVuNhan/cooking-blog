import { ErrorRes } from '@cookingblog/api/interfaces';
import { useLazyExtractRecipeQuery } from '@cookingblog/blog/recipe/data-access';
import { LoadingSpinner } from '@cookingblog/blog/ui/components/atoms';
import { ErrorBadge } from '@cookingblog/blog/ui/components/molecules';
import { forwardTo } from '@cookingblog/blog/utils';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import React, { useEffect, useRef } from 'react';

export interface ImportRecipeModalProps {
  open: boolean;
  onClose?: () => void;
}

export function ImportRecipeModal(props: ImportRecipeModalProps) {
  const { open, onClose } = props;
  const urlInputRef = useRef<HTMLInputElement>();

  const [
    trigger,
    { isLoading, isUninitialized, data, error },
  ] = useLazyExtractRecipeQuery();

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
