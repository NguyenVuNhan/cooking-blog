import { useGetQuery } from '@cookingblog/blog/shared/utils';
import { useExtractRecipeQuery } from '../apis/recipe.api';

export const useExtractRecipe = () => {
  const { url } = useGetQuery();

  const { isLoading, isUninitialized, data } = useExtractRecipeQuery(
    url || '',
    { skip: !url }
  );

  return { isLoading, isUninitialized, data };
};
