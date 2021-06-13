import { AddRecipeReq } from '@cookingblog/api/interfaces';
import { AddIngredientModal } from '@cookingblog/blog/ingredient/feature/components';
import {
  getErrors,
  getLoadingStatus,
  recipeActions,
} from '@cookingblog/blog/recipe/data-access';
import { AddStepGroup } from '@cookingblog/blog/recipe/feature/components';
import { RecipeTemplate } from '@cookingblog/blog/recipe/feature/template';
import {
  LoadingSpinner,
  TextField,
} from '@cookingblog/blog/ui/components/atoms';
import { ErrorBadge } from '@cookingblog/blog/ui/components/molecules';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

export function AddRecipe() {
  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<AddRecipeReq>({
    defaultValues: {
      steps: [],
      ingredients: [],
    },
  });
  const dispatch = useDispatch();
  const loading = useSelector(getLoadingStatus);
  const addRecipeErrors = useSelector(getErrors);

  // Handle ingredients autosuggestion for each step
  const [ingredients, setIngredients] = useState<string[]>([]);
  const stepIngredient = useRef<string[][]>([]);

  // Handle modal
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };
  const handleModalSave = (ingredients: AddRecipeReq['ingredients']) => {
    setIngredients(ingredients.map((val) => val.ingredient));
  };

  // Submits
  const onAddRecipe = (data: AddRecipeReq) => {
    if (data.steps) {
      data.steps = data.steps.map((step, index) => ({
        ...step,
        ingredients: stepIngredient.current[index],
      }));
    }
    dispatch(recipeActions.addRecipe(data));
  };

  return (
    <RecipeTemplate showToolBox={false}>
      {loading && <LoadingSpinner overlay />}
      <Grid
        container
        alignItems="flex-start"
        noValidate
        component="form"
        spacing={3}
        onSubmit={handleSubmit(onAddRecipe)}
      >
        <Grid item sm={12}>
          <Typography variant="h2" align="center" noWrap>
            Add New Recipe
          </Typography>
        </Grid>
        <Grid item sm={12}>
          <ErrorBadge {...addRecipeErrors} />
        </Grid>
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

        <Grid item sm={12} container spacing={3}>
          <h3 className="ml-2">
            Ingredients:
            {ingredients.map((ingredient: string, index: number) => (
              <Chip key={index} size="small" label={ingredient} />
            ))}
          </h3>
          <IconButton color="primary" onClick={handleModalOpen}>
            <AddCircleOutlineIcon />
          </IconButton>
        </Grid>

        <AddStepGroup
          control={control}
          errors={errors}
          register={register}
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
        control={control}
        register={register}
        open={modalOpen}
        handleClose={handleModalClose}
        handleSave={handleModalSave}
      />
    </RecipeTemplate>
  );
}

export default AddRecipe;
