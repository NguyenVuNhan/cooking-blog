import { AddRecipeReq, ErrorRes } from '@cookingblog/api/interfaces';
import { RecipeDTO } from '@cookingblog/api/recipe/dto';
import { AddIngredientModal } from '@cookingblog/blog/ingredient/feature/components';
import { mapIngredients } from '@cookingblog/blog/ingredient/utils';
import {
  useAddRecipe,
  useExtractRecipe,
} from '@cookingblog/blog/recipe/data-access';
import { AddStepGroup } from '@cookingblog/blog/recipe/ui/components';
import { RecipeTemplate } from '@cookingblog/blog/recipe/ui/template';
import {
  LoadingSpinner,
  TextField,
} from '@cookingblog/blog/shared/ui/components/atoms';
import { ErrorBadge } from '@cookingblog/blog/shared/ui/components/molecules';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import {
  Button,
  Chip,
  Grid,
  IconButton,
  MenuItem,
  Typography,
} from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/react';
import { useEffect, useState } from 'react';
import {
  FieldError,
  FormProvider,
  useForm,
  useFormState,
} from 'react-hook-form';

export function AddRecipe() {
  const { addRecipe, isLoading, addRecipeError } = useAddRecipe();
  const {
    data,
    isLoading: isExtractLoading,
    isUninitialized,
  } = useExtractRecipe();
  const loading = (!isUninitialized && isExtractLoading) || isLoading;

  const formMethods = useForm<RecipeDTO>({
    resolver: classValidatorResolver(RecipeDTO),
    defaultValues: {
      ingredients: [],
      ...data,
    },
  });
  const { register, handleSubmit, control, reset } = formMethods;
  const { errors } = useFormState({ control });
  useEffect(() => {
    if (data) {
      setIngredients(data.ingredients.map((v) => v.ingredient_name));

      reset({ ...data, ingredients: mapIngredients(data.ingredients) });
    }
  }, [data, reset]);

  // Handle ingredients autosuggestion for each step
  const [ingredients, setIngredients] = useState<string[]>([]);

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
        {loading && <LoadingSpinner overlay />}
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
              message={(errors.steps as unknown as FieldError)?.message}
            />
            <ErrorBadge
              message={(errors.ingredients as unknown as FieldError)?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              {...register('title')}
              defaultValue={data?.title}
              error={Boolean(errors.title)}
              helperText={errors.title?.message}
              label="Title"
              fullWidth
              InputLabelProps={!!data?.title && { shrink: true }}
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
              defaultValue={data?.serving}
              error={!!errors.serving}
              helperText={errors.serving?.message}
              fullWidth
              type="number"
              InputLabelProps={!!data?.serving && { shrink: true }}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              label="Duration"
              {...register('duration')}
              defaultValue={data?.duration}
              error={!!errors.duration}
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
              <IconButton color="primary" onClick={handleModalOpen}>
                <AddCircleOutlineIcon />
              </IconButton>
            </div>
          </Grid>

          <AddStepGroup ingredients={ingredients} />
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
