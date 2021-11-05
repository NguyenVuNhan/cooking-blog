import { useDeleteRecipeMutation } from '../apis/recipe.api';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const useDeleteRecipe = () => {
  const [deleteRecipe, { isSuccess, isUninitialized }] =
    useDeleteRecipeMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isUninitialized && isSuccess) {
      navigate(-1);
    }
  }, [navigate, isSuccess, isUninitialized]);

  return deleteRecipe;
};
