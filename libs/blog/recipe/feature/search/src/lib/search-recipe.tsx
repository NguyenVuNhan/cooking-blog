import { useLazySearchRecipeQuery } from '@cookingblog/blog/recipe/data-access';
import { RecipeTemplate } from '@cookingblog/blog/recipe/feature/template';
import { ListRecipe } from '@cookingblog/blog/recipe/ui/components';
import { LoadingSpinner } from '@cookingblog/blog/ui/components/atoms';
import { RTKQueryError } from '@cookingblog/blog/ui/error';
import { getQuery } from '@cookingblog/blog/utils';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function RecipeSearch() {
  const { search } = useLocation();
  const [
    trigger,
    { data, error, isLoading, isUninitialized },
  ] = useLazySearchRecipeQuery();

  useEffect(() => {
    const query = getQuery(search.substring(1), 'q') || '';
    trigger(query);
  }, [search]);

  return (
    <RecipeTemplate hideGoBack>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        className="hidden md:block"
      >
        <div>
          <Typography align="center" variant="h1">
            Cooking Blog
          </Typography>
        </div>
      </Box>
      <div className="my-3" />
      {!isUninitialized &&
        (isLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <RTKQueryError error={error} type="api" />
        ) : (
          <ListRecipe recipes={data.recipes} />
        ))}
    </RecipeTemplate>
  );
}

export default RecipeSearch;
