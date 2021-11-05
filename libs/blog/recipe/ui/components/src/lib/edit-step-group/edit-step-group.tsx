import { RecipeDTO } from '@cookingblog/api/recipe/dto';
import { AddStepGroup } from '../add-step-group/add-step-group';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { Button, Grid } from '@mui/material';
import { useRef } from 'react';
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
        <AddStepGroup
          ingredients={recipe.ingredients.map((val) => val.ingredient)}
          {...rest}
        />
        <Grid item sm={12} container alignItems="flex-end" spacing={3}>
          <Grid item container sm={6} justifyContent="center">
            <Button variant="contained" color="primary" type="submit">
              Save
            </Button>
          </Grid>
          <Grid item container sm={6} justifyContent="center">
            <Button variant="contained" onClick={handleClose}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

export default EditStepGroup;
