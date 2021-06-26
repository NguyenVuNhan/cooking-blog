import { AddRecipeReq, ErrorRes } from '@cookingblog/api/interfaces';
import { RecipeDTO } from '@cookingblog/api/recipe/dto';
import { AddIngredientModal } from '@cookingblog/blog/ingredient/feature/components';
import { useAddRecipe } from '@cookingblog/blog/recipe/data-access';
import { AddStepGroup } from '@cookingblog/blog/recipe/feature/components';
import { RecipeTemplate } from '@cookingblog/blog/recipe/feature/template';
import {
  LoadingSpinner,
  TextField,
} from '@cookingblog/blog/ui/components/atoms';
import { ErrorBadge } from '@cookingblog/blog/ui/components/molecules';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/react';
import React, { useRef, useState } from 'react';
import {
  FieldError,
  FormProvider,
  useForm,
  useFormState,
} from 'react-hook-form';

export function AddRecipe() {
  const formMethods = useForm<RecipeDTO>({
    resolver: classValidatorResolver(RecipeDTO),
    defaultValues: {
      steps: [],
      ingredients: [],
    },
  });
  const { register, handleSubmit, control } = formMethods;
  const { errors } = useFormState({ control });
  const { addRecipe, isLoading, addRecipeError } = useAddRecipe();

  // Handle ingredients autosuggestion for each step
  const [ingredients, setIngredients] = useState<string[]>([]);
  const stepIngredient = useRef<string[][]>([]);

  // Handle modal
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  const handleModalSave = (ingredients: AddRecipeReq['ingredients']) => {
    setIngredients(ingredients.map((val) => val.ingredient));
  };

  return (
    <FormProvider {...formMethods}>
      <RecipeTemplate showToolBox={false}>
        {isLoading && <LoadingSpinner overlay />}
        <Grid
          container
          alignItems="flex-start"
          noValidate
          component="form"
          spacing={3}
          onSubmit={handleSubmit(addRecipe)}
        >
          <Grid item sm={12}>
            <Typography variant="h2" align="center" noWrap>
              Add New Recipe
            </Typography>
          </Grid>
          <Grid item sm={12}>
            <ErrorBadge
              {...((addRecipeError as FetchBaseQueryError)?.data as ErrorRes)
                ?.data}
            />
            <ErrorBadge
              message={((errors.steps as unknown) as FieldError)?.message}
            />
            <ErrorBadge
              message={((errors.ingredients as unknown) as FieldError)?.message}
            />
          </Grid>
          <Grid item sm={8}>
            <TextField
              {...register('title')}
              error={Boolean(errors.title)}
              helperText={errors.title?.message}
              label="Title"
              fullWidth
            />
          </Grid>

          <Grid item sm={2}>
            <TextField
              label="Serving"
              {...register('serving', { valueAsNumber: true })}
              error={Boolean(errors.serving)}
              helperText={errors.serving?.message}
              fullWidth
              type="number"
            />
          </Grid>

          <Grid item sm={2}>
            <TextField
              label="Duration"
              {...register('duration')}
              error={Boolean(errors.duration)}
              helperText={errors.duration?.message}
              fullWidth
            />
          </Grid>

          <Grid
            item
            className="flex items-center"
            sm={12}
            container
            spacing={3}
          >
            <div className="ml-2">
              <p className="text-xl inline-block mr-2">Ingredients:</p>
              {ingredients.map((ingredient: string, index: number) => (
                <Chip key={index} size="small" label={ingredient} />
              ))}
            </div>
            <IconButton color="primary" onClick={handleModalOpen}>
              <AddCircleOutlineIcon />
            </IconButton>
          </Grid>

          <AddStepGroup
            ingredients={ingredients}
            stepIngredient={stepIngredient.current}
          />
          <Grid item container sm={12}>
            <Button color="primary" variant="contained" type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
        <AddIngredientModal
          title="Add Ingredient"
          open={modalOpen}
          handleClose={handleModalClose}
          handleSave={handleModalSave}
        />
      </RecipeTemplate>
    </FormProvider>
  );
}

export default AddRecipe;
