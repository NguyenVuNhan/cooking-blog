import { useSearchRecipeQuery } from '@cookingblog/blog/recipe/data-access';
import { ListRecipe } from '@cookingblog/blog/recipe/feature/components';
import { RecipeTemplate } from '@cookingblog/blog/recipe/feature/template';
import { LoadingSpinner } from '@cookingblog/blog/ui/components/atoms';
import {
  SearchInput,
  SearchInputProps,
} from '@cookingblog/blog/ui/components/molecules';
import { appendToPath, getQuery } from '@cookingblog/blog/utils';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';

export function RecipeSearch() {
  const [query, setQuery] = useState(getQuery('q') || '');
  const { data, error, isLoading } = useSearchRecipeQuery(query);

  const onSearch: SearchInputProps['onSearch'] = ({ query }) => {
    setQuery(query);
    appendToPath(`?q=${query}`);
  };

  return (
    <RecipeTemplate hideGoBack>
      <Box display="flex" alignItems="center" justifyContent="center">
        <div>
          <Typography align="center" variant="h1">
            Cooking Blog
          </Typography>
          <SearchInput onSearch={onSearch} />
        </div>
      </Box>
      <div className="my-3" />
      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        JSON.stringify(error)
      ) : (
        <ListRecipe recipes={data.recipes} />
      )}
    </RecipeTemplate>
  );
}

export default RecipeSearch;
