import { useAddRecipeMutation } from '@cookingblog/blog/recipe/data-access';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export const useAddRecipe = () => {
  const [
    addRecipe,
    { isLoading, error: addRecipeError, isSuccess, isUninitialized, data },
  ] = useAddRecipeMutation();
  const history = useHistory();

  useEffect(() => {
    if (!isUninitialized && isSuccess) {
      history.push('/');
      history.push(`/recipe/${data.id}`);
    }
  }, [isSuccess, isUninitialized, data, history]);

  return { addRecipe, isLoading, addRecipeError };
};
