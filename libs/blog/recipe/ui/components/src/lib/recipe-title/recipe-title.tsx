import { UpdateRecipeReq } from '@cookingblog/api/interfaces';
import { IRecipe } from '@cookingblog/api/recipe';
import { RecipeTitleEdit } from '@cookingblog/blog/recipe/ui/components';
import { EditButton } from '@cookingblog/blog/shared/ui/components/atoms';
import { Box, Typography } from '@material-ui/core';
import { memo, useState } from 'react';

export interface RecipeTitleProps {
  recipe: IRecipe;
  allowEdit: boolean;
  onUpdate: (data: UpdateRecipeReq) => void;
}

function propsAreEqual(
  prev: RecipeTitleProps,
  next: RecipeTitleProps
): boolean {
  return (
    prev.allowEdit === next.allowEdit &&
    prev.recipe.ingredients.length === prev.recipe.ingredients.length &&
    prev.recipe.duration === next.recipe.duration &&
    prev.recipe.serving === next.recipe.serving
  );
}

export const RecipeTitle = memo<RecipeTitleProps>(function (props) {
  const { recipe, allowEdit, onUpdate } = props;
  const [isEditing, setIsEditing] = useState(false);

  return !isEditing ? (
    <>
      <Typography variant="h2" align="center">
        <Box fontWeight="fontWeightBold" pb={2}>
          {recipe?.title}
        </Box>
      </Typography>
      <Typography align="center" noWrap>
        {recipe?.ingredients.length} ingredients - {recipe?.duration} -{' '}
        {recipe?.serving} serving
        <EditButton show={allowEdit} onClick={() => setIsEditing(true)} />
      </Typography>
    </>
  ) : (
    <RecipeTitleEdit
      data={recipe}
      onUpdate={onUpdate}
      handleClose={() => setIsEditing(false)}
    />
  );
}, propsAreEqual);

export default RecipeTitle;
