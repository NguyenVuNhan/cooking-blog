import { useLazySearchRecipeQuery } from '@cookingblog/blog/recipe/data-access';
import { RecipeTemplate } from '@cookingblog/blog/recipe/ui/template';
import { ListRecipe } from '@cookingblog/blog/recipe/ui/components';
import { LoadingSpinner } from '@cookingblog/blog/shared/ui/components/atoms';
import { RTKQueryError } from '@cookingblog/blog/shared/ui/error';
import { getQuery } from '@cookingblog/blog/shared/utils';
import { Box, Typography } from '@material-ui/core';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { TMeal } from '@cookingblog/api/recipe/dto';

export function RecipeSearch() {
  const { search } = useLocation();
  const [trigger, { data, error, isLoading, isUninitialized }] =
    useLazySearchRecipeQuery();

  useEffect(() => {
    const query = getQuery(search.substring(1), 'q') || '';
    const meal = (getQuery(search.substring(1), 'meal') as TMeal) || undefined;

    trigger({ query, meal });
  }, [search]);

  return (
    <RecipeTemplate hideGoBack showToolBox={false}>
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
