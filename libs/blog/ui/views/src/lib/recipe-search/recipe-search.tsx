import {
  recipeActions,
  recipeSelector,
} from '@cookingblog/blog/data-access/store';
import {
  ListRecipe,
  SearchInput,
  SearchInputProps,
} from '@cookingblog/blog/ui/components';
import { RecipeTemplate } from '@cookingblog/blog/ui/templates';
import { appendToPath, getQuery } from '@cookingblog/blog/utils';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export function RecipeSearch() {
  const recipes = useSelector(recipeSelector.recipes);
  const dispatch = useDispatch();

  const onSearch: SearchInputProps['onSearch'] = ({ query }) => {
    dispatch(recipeActions.searchRecipe(query));
    appendToPath(`?q=${query}`);
  };

  useEffect(() => {
    const query = getQuery('q');
    console.log('init');
    if (query === false) return;
    console.log('fetch');
    dispatch(recipeActions.searchRecipe(query));
  }, [dispatch]);

  console.log(recipes);

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
      <ListRecipe recipes={recipes} />
    </RecipeTemplate>
  );
}

export default RecipeSearch;
