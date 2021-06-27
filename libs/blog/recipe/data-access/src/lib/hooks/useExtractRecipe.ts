import { getQuery } from '@cookingblog/blog/utils';
import { useState } from 'react';
import { useExtractRecipeQuery } from '../apis/recipe.api';

export const useExtractRecipe = () => {
  const [url] = useState<string | false>(getQuery('url'));
  const { isLoading, isUninitialized, data } = useExtractRecipeQuery(
    url || '',
    { skip: !url }
  );

  return { isLoading, isUninitialized, data };
};
