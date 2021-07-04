import { RecipeDTO } from '@cookingblog/api/recipe/dto';
import { AddStepGroup } from '@cookingblog/blog/recipe/ui/components';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import React, { useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

export interface EditStepGroupProps {
  recipe: Partial<RecipeDTO>;
  onUpdate: (data: Partial<RecipeDTO>) => void;
  handleClose: () => void;
}

export function EditStepGroup(props: EditStepGroupProps) {
  const { recipe, onUpdate, handleClose, ...rest } = props;
  const formMethods = useForm<RecipeDTO>({
    defaultValues: {
      steps: recipe.steps,
    },
    resolver: classValidatorResolver(RecipeDTO, {
      skipMissingProperties: true,
    }),
  });
  const { handleSubmit } = formMethods;

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
    <FormProvider {...formMethods}>
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
          ingredients={recipe.ingredients.map((val) => val.ingredient)}
          {...rest}
        />
      </Grid>
    </FormProvider>
  );
}

export default EditStepGroup;
