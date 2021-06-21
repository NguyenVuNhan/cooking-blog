import { RecipeDTO } from '@cookingblog/api/recipe/dto';
import { AddStepGroup } from '@cookingblog/blog/recipe/feature/components';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';

export interface EditStepGroupProps {
  recipe: Partial<RecipeDTO>;
  onUpdate: (data: Partial<RecipeDTO>) => void;
  handleClose: () => void;
}

export function EditStepGroup(props: EditStepGroupProps) {
  const { recipe, onUpdate, handleClose, ...rest } = props;
  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<RecipeDTO>({
    defaultValues: {
      steps: recipe.steps,
    },
    resolver: classValidatorResolver(RecipeDTO, {
      skipMissingProperties: true,
    }),
  });

  // Handle ingredients autosuggestion for each step
  const stepIngredient = useRef<string[][]>(
    recipe.steps.map((step) => step.ingredients)
  );

  const onSubmit = (data: Partial<RecipeDTO>) => {
    data.steps = data.steps?.map((step, index) => ({
      ...step,
      ingredients: stepIngredient.current[index],
    }));

    onUpdate(data);
    handleClose();
  };

  return (
    <Grid
      container
      alignItems="flex-start"
      noValidate
      component="form"
      spacing={3}
      onSubmit={handleSubmit(onSubmit)}
    >
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
      <AddStepGroup
        control={control}
        errors={errors}
        register={register}
        ingredients={recipe.ingredients.map((val) => val.ingredient)}
        stepIngredient={stepIngredient.current}
        {...rest}
      />
    </Grid>
  );
}

export default EditStepGroup;