import { TMeal } from '@cookingblog/api/recipe/dto';
import { useLazySearchRecipeQuery } from '@cookingblog/blog/recipe/data-access';
import { ListRecipe } from '@cookingblog/blog/recipe/ui/components';
import { RecipeTemplate } from '@cookingblog/blog/recipe/ui/template';
import { LoadingSpinner } from '@cookingblog/blog/shared/ui/components/atoms';
import { RTKQueryError } from '@cookingblog/blog/shared/ui/error';
import { useGetQuery } from '@cookingblog/blog/shared/utils';
import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function RecipeSearch() {
  const { search } = useLocation();
  const [trigger, { data, error, isLoading, isUninitialized }] =
    useLazySearchRecipeQuery();
  const query = useGetQuery();

  useEffect(() => {
    trigger({ query: query.q, meal: query.meal as TMeal });
  }, [search, query]);

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
