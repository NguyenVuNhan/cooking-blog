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
  RecipeTitle,
} from '@cookingblog/blog/recipe/ui/components';
import { RecipeTemplate } from '@cookingblog/blog/recipe/ui/template';
import { LoadingSpinner } from '@cookingblog/blog/shared/ui/components/atoms';
import { RTKQueryError } from '@cookingblog/blog/shared/ui/error';
import { Box, Button, Divider } from '@material-ui/core';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export function ViewRecipe() {
  const { id } = useParams<{ id: string }>();
  const deleteRecipe = useDeleteRecipe();
  const updateRecipe = useUpdateRecipe(id);
  const { data: recipe, isLoading, error } = useGetRecipeQuery(id);
  const userId = useSelector(getUserId);
  const [stepEdit, setStepEdit] = useState(false);

  const isOwner = recipe?.user === userId;

  if (isLoading) return <LoadingSpinner overlay />;
  if (!recipe) return <RTKQueryError error={error} />;

  return (
    <RecipeTemplate>
      <RecipeTitle
        recipe={recipe}
        allowEdit={isOwner}
        onUpdate={updateRecipe}
      />
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

export default ViewRecipe;
