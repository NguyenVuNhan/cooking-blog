import { UpdateRecipeReq } from '@cookingblog/api/interfaces';
import { RecipeDTO } from '@cookingblog/api/recipe/dto';
import { TextField } from '@cookingblog/blog/shared/ui/components/atoms';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { Button, Grid, MenuItem } from '@material-ui/core';
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
      <Grid item xs={12}>
        <TextField
          {...register('title')}
          error={!!errors.title}
          helperText={errors.title?.message}
          label="Title"
          fullWidth
        />
      </Grid>

      <Grid item xs={4}>
        <TextField
          label="Meal"
          {...register('typeOfMeal')}
          defaultValue={data?.typeOfMeal}
          error={!!errors.typeOfMeal}
          helperText={errors.typeOfMeal?.message}
          fullWidth
          InputLabelProps={!!data?.typeOfMeal && { shrink: true }}
          InputProps={{ className: 'capitalize' }}
          select
        >
          {['breakfast', 'lunch', 'snack', 'dinner'].map((type) => (
            <MenuItem key={type} value={type} className="capitalize">
              {type}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      <Grid item xs={4}>
        <TextField
          label="Serving"
          {...register('serving', { valueAsNumber: true })}
          error={!!errors.serving}
          helperText={errors.serving?.message}
          fullWidth
        />
      </Grid>

      <Grid item xs={4}>
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
