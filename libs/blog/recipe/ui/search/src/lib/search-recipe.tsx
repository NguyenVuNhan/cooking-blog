import {
  getRecipes,
  recipeActions,
} from '@cookingblog/blog/recipe/data-access';
import { ListRecipe } from '@cookingblog/blog/recipe/feature/components';
import { RecipeTemplate } from '@cookingblog/blog/recipe/feature/template';
import {
  SearchInput,
  SearchInputProps,
} from '@cookingblog/blog/ui/components/molecules';
import { appendToPath, getQuery } from '@cookingblog/blog/utils';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export function RecipeSearch() {
  const recipes = useSelector(getRecipes);
  const dispatch = useDispatch();

  const onSearch: SearchInputProps['onSearch'] = ({ query }) => {
    dispatch(recipeActions.searchRecipe(query));
    appendToPath(`?q=${query}`);
  };

  useEffect(() => {
    const query = getQuery('q');
    if (query === false) return;
    dispatch(recipeActions.searchRecipe(query));
  }, [dispatch]);

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
