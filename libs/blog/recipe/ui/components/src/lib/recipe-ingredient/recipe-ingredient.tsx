import { IRecipe } from '@cookingblog/api/recipe';
import { getUserId } from '@cookingblog/blog/auth/data-access';
import { EditIngredientModal } from '@cookingblog/blog/ingredient/feature/components';
import {
  EditButton,
  ToShoppingListButton,
} from '@cookingblog/blog/shared/ui/components/atoms';
import { ShoppingListCtx } from '@cookingblog/blog/shopping-list/data-access';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemIcon,
  Theme,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useContext, useState } from 'react';
import { useSelector } from 'react-redux';

/* eslint-disable-next-line */
export interface RecipeIngredientProps {
  recipe: IRecipe;
}

export function RecipeIngredient(props: RecipeIngredientProps) {
  const { recipe } = props;
  const classes = useStyle();
  const [ingredientEdit, setIngredientEdit] = useState(false);
  const userId = useSelector(getUserId);
  const isOwner = recipe?.user === userId;

  const { addAllToShoppingList, addOneToShoppingList, removeItem } =
    useContext(ShoppingListCtx);

  return (
    <>
      <EditIngredientModal
        recipeId={recipe.id}
        defaultIngredients={recipe.ingredients}
        open={ingredientEdit}
        handleClose={() => setIngredientEdit(false)}
      />

      <Typography variant="h5" align="left" noWrap>
        <Box fontWeight={500}>
          Ingredients
          <EditButton
            show={isOwner && !ingredientEdit}
            onClick={() => setIngredientEdit(true)}
          />
        </Box>
      </Typography>

      <List>
        {recipe?.ingredients.map(({ ingredient, raw_data }, index) => (
          <ListItem key={index} className={classes.ingredientItem}>
            <ListItemIcon>
              <ToShoppingListButton
                onSelect={() =>
                  addOneToShoppingList(ingredient, recipe.title, raw_data)
                }
                onRemove={() => removeItem(recipe.title, ingredient)}
              />
            </ListItemIcon>
            <Typography>{raw_data.replace('of ', '')}</Typography>
          </ListItem>
        ))}
      </List>

      <Box display="flex" justifyContent="center">
        <Button
          color="primary"
          startIcon={<AddShoppingCartIcon />}
          className="normal-case"
          onClick={() => recipe && addAllToShoppingList(recipe)}
        >
          Add all to shopping list
        </Button>
      </Box>
    </>
  );
}

const useStyle = makeStyles((theme: Theme) => ({
  ingredientItem: {
    '& .MuiListItemIcon-root': {
      minWidth: 'max-content',
    },
    '& .MuiCheckbox-root': {
      paddingTop: theme.spacing(0),
      paddingBottom: theme.spacing(0),
    },
  },
}));

export default RecipeIngredient;
