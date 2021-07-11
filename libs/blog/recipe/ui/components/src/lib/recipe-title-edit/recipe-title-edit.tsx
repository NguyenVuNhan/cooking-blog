import { UpdateRecipeReq } from '@cookingblog/api/interfaces';
import { RecipeDTO } from '@cookingblog/api/recipe/dto';
import { TextField } from '@cookingblog/blog/shared/ui/components/atoms';
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
    resolver: classValidatorResolver(RecipeDTO, {
      skipMissingProperties: true,
    }),
    defaultValues: {
      title: data.title,
      serving: data.serving,
      duration: data.duration,
    },
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
      <Grid item xs={12} sm={8}>
        <TextField
          {...register('title')}
          error={!!errors.title}
          helperText={errors.title?.message}
          label="Title"
          fullWidth
        />
      </Grid>
      <Grid item xs={6} sm={2}>
        <TextField
          label="Serving"
          {...register('serving', { valueAsNumber: true })}
          error={!!errors.serving}
          helperText={errors.serving?.message}
          fullWidth
        />
      </Grid>
      <Grid item xs={6} sm={2}>
        <TextField
          label="Duration"
          {...register('duration')}
          error={!!errors.duration}
          helperText={errors.duration?.message}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} className="flex justify-around">
        <Button variant="contained" color="primary" type="submit">
          Save
        </Button>
        <Button variant="contained" onClick={handleClose}>
          Cancel
        </Button>
      </Grid>
    </Grid>
  );
}

export default RecipeTitleEdit;
