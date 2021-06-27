import { UpdateRecipeReq } from '@cookingblog/api/interfaces';
import { useUpdateRecipeMutation } from '@cookingblog/blog/recipe/data-access';
import { useCallback } from 'react';

export const useUpdateRecipe = (id: string) => {
  const [updateRecipe] = useUpdateRecipeMutation();

  const _updateRecipe = useCallback(
    (body: UpdateRecipeReq) => {
      updateRecipe({ id, body });
    },
    [id, updateRecipe]
  );

  return _updateRecipe;
};
