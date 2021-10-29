import { getAuthenticated } from '@cookingblog/blog/auth/data-access';
import { ImportRecipeModal } from '@cookingblog/blog/shared/feature/import-recipe-modal';
import {
  SidebarHeader,
  SidebarSearch,
  SidebarSearchProps,
} from '@cookingblog/blog/home/ui/components';
import { ShoppingListCtx } from '@cookingblog/blog/shopping-list/data-access';
import { Button, Paper } from '@material-ui/core';
import { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

/* eslint-disable-next-line */
export interface SideBarProps {}

export function SideBar(props: SideBarProps) {
  const authenticated = useSelector(getAuthenticated);
  const [importRecipeOpen, setImportRecipeOpen] = useState(false);
  const history = useHistory();
  const { openShoppingList } = useContext(ShoppingListCtx);

  const onSearch: SidebarSearchProps['onSearch'] = ({ query, meal }) => {
    history.push({
      pathname: '/search',
      search: `?q=${query}${meal ? '&meal=' + meal : ''}`,
    });
  };

  return (
    <Paper
      className="hidden md:w-[400px] md:flex md:flex-col bg-white"
      elevation={3}
    >
      <SidebarHeader />
      <div className="flex-grow-1 flex flex-col align-center">
        <div className="h-2/5"></div>
        <div className="">
          <SidebarSearch onSearch={onSearch} />
          <br />
          {authenticated && (
            <div className="flex px-3 py-1 justify-around">
              <Link to="/recipe/add">
                <Button variant="contained" color="secondary">
                  Add recipe
                </Button>
              </Link>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => setImportRecipeOpen(true)}
              >
                Import Recipe
              </Button>
              <ImportRecipeModal
                open={importRecipeOpen}
                onClose={() => setImportRecipeOpen(false)}
              />
            </div>
          )}
        </div>
      </div>
      <div className="flex px-3 py-1 justify-center">
        <Button
          variant="contained"
          color="secondary"
          onClick={openShoppingList}
        >
          View shopping List
        </Button>
      </div>
    </Paper>
  );
}

export default SideBar;
