import { UpdateRecipeReq } from '@cookingblog/api/interfaces';
import { RecipeDTO } from '@cookingblog/api/recipe/dto';
import { TextField } from '@cookingblog/blog/ui/components/atoms';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import { useForm, useFormState } from 'react-hook-form';

export interface RecipeTitleEditProps {
  onUpdate: (data: UpdateRecipeReq) => void;
  handleClose?: () => void;
  data: UpdateRecipeReq;
}

export function RecipeTitleEdit(props: RecipeTitleEditProps) {
  const { onUpdate, handleClose, data } = props;

  const { register, control, handleSubmit } = useForm<UpdateRecipeReq>({
    resolver: classValidatorResolver(RecipeDTO),
    defaultValues: data,
  });
  const { errors } = useFormState({ control });

  const onSubmit = (data: UpdateRecipeReq) => {
    onUpdate(data);
    handleClose && handleClose();
  };

  return (
    <Grid
      container
      noValidate
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      spacing={3}
    >
      <Grid item sm={9}>
        <TextField
          {...register('title', { required: 'Title is required' })}
          error={Boolean(errors.title)}
          helperText={errors.title?.message}
          label="Title"
          fullWidth
        />
      </Grid>
      <Grid item sm={3}>
        <TextField
          label="Duration"
          {...register('duration', { required: 'Duration is required' })}
          error={Boolean(errors.duration)}
          helperText={errors.duration?.message}
          fullWidth
        />
      </Grid>

      <Grid item sm={12} container alignItems="flex-end" spacing={3}>
        <Grid item container sm={6} justify="center">
          <Button variant="contained" color="primary" type="submit">
            Save
          </Button>
        </Grid>
        <Grid item container sm={6} justify="center">
          <Button variant="contained" onClick={handleClose}>
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default RecipeTitleEdit;
