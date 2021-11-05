import { useAddRecipeMutation } from '@cookingblog/blog/recipe/data-access';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAddRecipe = () => {
  const [
    addRecipe,
    { isLoading, error: addRecipeError, isSuccess, isUninitialized, data },
  ] = useAddRecipeMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isUninitialized && isSuccess) {
      navigate('/');
      navigate(`/recipe/${data.id}`);
    }
  }, [isSuccess, isUninitialized, data, navigate]);

  return { addRecipe, isLoading, addRecipeError };
};
