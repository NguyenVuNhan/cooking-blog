import { useDeleteRecipeMutation } from '../apis/recipe.api';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';

export const useDeleteRecipe = () => {
  const [
    deleteRecipe,
    { isSuccess, isUninitialized },
  ] = useDeleteRecipeMutation();
  const history = useHistory();

  useEffect(() => {
    if (!isUninitialized && isSuccess) {
      history.goBack();
    }
  }, [history, isSuccess, isUninitialized]);

  return deleteRecipe;
};
