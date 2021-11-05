import { ErrorRes } from '@cookingblog/api/interfaces';
import { useLazyExtractRecipeQuery } from '@cookingblog/blog/recipe/data-access';
import { LoadingSpinner } from '@cookingblog/blog/shared/ui/components/atoms';
import { ErrorBadge } from '@cookingblog/blog/shared/ui/components/molecules';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export interface ImportRecipeModalProps {
  open: boolean;
  onClose?: () => void;
}

export function ImportRecipeModal(props: ImportRecipeModalProps) {
  const { open, onClose } = props;
  const navigate = useNavigate();
  const urlInputRef = useRef<HTMLInputElement>();

  const [trigger, { isLoading, isUninitialized, data, error }] =
    useLazyExtractRecipeQuery();

  useEffect(() => {
    if (data) {
      navigate(`/recipe/add?url=${urlInputRef?.current?.value}`);
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
