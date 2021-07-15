import { getUserId } from '@cookingblog/blog/auth/data-access';
import {
  useDeleteRecipe,
  useGetRecipeQuery,
  useUpdateRecipe,
} from '@cookingblog/blog/recipe/data-access';
import {
  EditStepGroup,
  RecipeIngredient,
  RecipeStep,
  RecipeTitleEdit,
} from '@cookingblog/blog/recipe/ui/components';
import { RecipeTemplate } from '@cookingblog/blog/recipe/ui/template';
import {
  EditButton,
  LoadingSpinner,
} from '@cookingblog/blog/shared/ui/components/atoms';
import { RTKQueryError } from '@cookingblog/blog/shared/ui/error';
import { Box, Button, Divider, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export function ViewRecipe() {
  const classes = useStyle();

  // Fetch data
  const { id } = useParams<{ id: string }>();
  const deleteRecipe = useDeleteRecipe();
  const updateRecipe = useUpdateRecipe(id);
  const { data: recipe, isLoading, error } = useGetRecipeQuery(id);
  const userId = useSelector(getUserId);
  const [stepEdit, setStepEdit] = useState(false);
  const [titleEdit, setTitleEdit] = useState(false);

  const isOwner = recipe?.user === userId;

  if (isLoading) return <LoadingSpinner overlay />;
  if (!recipe) return <RTKQueryError error={error} />;

  return (
    <RecipeTemplate>
      {!titleEdit ? (
        <>
          <Typography variant="h2" align="center">
            <Box fontWeight="fontWeightBold" pb={2}>
              {recipe?.title}
            </Box>
          </Typography>
          <Typography align="center" noWrap>
            {recipe?.ingredients.length} ingredients - {recipe?.duration} -{' '}
            {recipe?.serving} serving
            <EditButton
              show={isOwner && !titleEdit}
              onClick={() => setTitleEdit(true)}
            />
          </Typography>
        </>
      ) : (
        <RecipeTitleEdit
          data={recipe}
          onUpdate={updateRecipe}
          handleClose={() => setTitleEdit(false)}
        />
      )}
      <Divider variant="middle" className="my-1" />

      <RecipeIngredient recipe={recipe} />

      {/* Steps */}
      {!stepEdit ? (
        recipe?.steps.map((step, index) => (
          <RecipeStep step={step} index={index + 1} key={index} />
        ))
      ) : (
        <EditStepGroup
          recipe={recipe}
          onUpdate={updateRecipe}
          handleClose={() => setStepEdit(false)}
        />
      )}

      {isOwner && !stepEdit && (
        <Box display="flex" justifyContent="center">
          <Box px={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setStepEdit(true)}
            >
              Edit Steps
            </Button>
          </Box>
          <Box px={2}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => deleteRecipe(id)}
            >
              Delete
            </Button>
          </Box>
        </Box>
      )}
    </RecipeTemplate>
  );
}

const useStyle = makeStyles((theme) =>
  createStyles({
    ingredientItem: {
      '& .MuiListItemIcon-root': {
        minWidth: 'max-content',
      },
      '& .MuiCheckbox-root': {
        paddingTop: theme.spacing(0),
        paddingBottom: theme.spacing(0),
      },
    },
  })
);

export default ViewRecipe;
