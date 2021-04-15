import {
  AddRecipeReq,
  IRecipe,
  UpdateRecipeReq,
} from '@cookingblog/api-interfaces';
import { AddStepGroup } from '@cookingblog/blog/ui/components';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';

export interface EditStepGroupProps {
  recipe: IRecipe;
  onUpdate: (data: UpdateRecipeReq) => void;
  handleClose: () => void;
}

export function EditStepGroup(props: EditStepGroupProps) {
  const { recipe, onUpdate, handleClose, ...rest } = props;
  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<AddRecipeReq>({
    defaultValues: {
      steps: recipe.steps,
    },
  });

  // Handle ingredients autosuggestion for each step
  const stepIngredient = useRef<string[][]>(
    recipe.steps.map((step) => step.ingredients)
  );

  const onSubmit = (data: UpdateRecipeReq) => {
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
