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
import { appendToPath } from '@cookingblog/blog/utils';
import { useQuery } from '@cookingblog/shared/web/hooks';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export function RecipeSearch() {
  const recipes = useSelector(recipeSelector.recipes);
  const dispatch = useDispatch();
  const q = useQuery();

  const onSearch: SearchInputProps['onSearch'] = ({ query }) => {
    dispatch(recipeActions.searchRecipe(query));
    appendToPath(`?q=${query}`);
  };

  useEffect(() => {
    console.log('init');
    console.log(q.has('q'));

    if (!q.get('q')) return;
    const query = q.get('q') || '';

    dispatch(recipeActions.searchRecipe(query));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, q]);

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
