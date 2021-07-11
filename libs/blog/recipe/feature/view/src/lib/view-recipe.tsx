import { RTKQueryError } from '@cookingblog/blog/shared/ui/error';
import { getUserId } from '@cookingblog/blog/auth/data-access';
import { EditIngredientModal } from '@cookingblog/blog/ingredient/feature/components';
import {
  useDeleteRecipe,
  useGetRecipeQuery,
  useUpdateRecipe,
} from '@cookingblog/blog/recipe/data-access';
import {
  EditStepGroup,
  RecipeTitleEdit,
} from '@cookingblog/blog/recipe/ui/components';
import { RecipeTemplate } from '@cookingblog/blog/recipe/ui/template';
import { strToDuration } from '@cookingblog/blog/recipe/utils';
import { ShoppingListCtx } from '@cookingblog/blog/shopping-list/data-access';
import {
  EditButton,
  LoadingSpinner,
  ToShoppingListButton,
} from '@cookingblog/blog/shared/ui/components/atoms';
import { TimerSnackbar } from '@cookingblog/blog/shared/ui/components/molecules';
import { mapStringMatch } from '@cookingblog/shared/utils';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import CloseIcon from '@material-ui/icons/Close';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import React, { Fragment, SyntheticEvent, useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export function ViewRecipe() {
  const classes = useStyle();

  // Fetch data
  const { id } = useParams<{ id: string }>();
  const deleteRecipe = useDeleteRecipe();
  const updateRecipe = useUpdateRecipe(id);
  const { data: recipe, isLoading, error } = useGetRecipeQuery(id);
  const userId = useSelector(getUserId);

  const { addAllToShoppingList, addOneToShoppingList, removeItem } =
    useContext(ShoppingListCtx);

  const [ingredientEdit, setIngredientEdit] = useState(false);
  const [stepEdit, setStepEdit] = useState(false);
  const [titleEdit, setTitleEdit] = useState(false);
  const [timerOpen, setTimerOpen] = useState(false);
  const [timeoutOpen, setTimeoutOpen] = useState(false);
  const [duration, setDuration] = useState(0);

  const handleClose = () => {
    setTimeoutOpen(false);
  };

  const startTimer = (duration: number) => () => {
    setTimerOpen(false);
    setDuration(duration);
    setTimerOpen(true);
  };

  const closeTimer = (_?: SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setTimerOpen(false);
    if (reason === 'timeout') {
      setTimeoutOpen(true);
    }
  };

  const isOwner = recipe?.user === userId;

  if (isLoading) return <LoadingSpinner overlay />;
  if (!recipe) return <RTKQueryError error={error} />;

  return (
    <RecipeTemplate>
      <EditIngredientModal
        defaultIngredients={recipe.ingredients}
        open={ingredientEdit}
        handleClose={() => setIngredientEdit(false)}
        onUpdate={updateRecipe}
      />
      {timerOpen && (
        <TimerSnackbar
          onClose={closeTimer}
          open={timerOpen}
          duration={duration}
        />
      )}
      <Dialog
        open={timeoutOpen}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <Alert
          severity="warning"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setTimeoutOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          <AlertTitle>Time out</AlertTitle>
          Ding Ding Ding
        </Alert>
      </Dialog>
      {!titleEdit ? (
        <>
          <Typography variant="h2" align="center">
            <Box fontWeight="fontWeightBold" pb={2}>
              {recipe?.title}
            </Box>
          </Typography>
          <Typography align="center" noWrap>
            {recipe?.ingredients.length} ingredients - {recipe?.duration} -{' '}
            {recipe?.serving} serving
            <EditButton
              show={isOwner && !ingredientEdit}
              onClick={() => setTitleEdit(true)}
            />
          </Typography>
        </>
      ) : (
        <RecipeTitleEdit
          data={recipe}
          onUpdate={updateRecipe}
          handleClose={() => setTitleEdit(false)}
        />
      )}
      <Divider variant="middle" className="my-1" />

      {/* Ingredient */}
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
            <Typography>{raw_data}</Typography>
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

      {/* Steps */}
      {!stepEdit ? (
        recipe?.steps.map((step, index) => (
          <Fragment key={index}>
            <Divider variant="middle" className="my-1" />
            <Box key={index} py={2}>
              <Typography variant="h5" align="left" noWrap>
                <Box fontWeight={500}>Step {index + 1}:</Box>
              </Typography>
              <p>
                <span className="font-semibold">Ingredients:</span>{' '}
                {step.ingredients.join(', ')}
              </p>
              <Box lineHeight={2}>
                <strong>Description:</strong>
                {mapStringMatch(
                  step.description,
                  /(\d\d*\s*(?:-\s*\d\d*\s*)?\w*)/g,
                  (val, match, i) =>
                    !match ? (
                      val
                    ) : (
                      <Box
                        component="a"
                        bgcolor="primary.main"
                        color="white"
                        px={0.8}
                        py={0.3}
                        borderRadius={10}
                        fontWeight={500}
                        key={i}
                        onClick={startTimer(strToDuration(val))}
                      >
                        {val}
                      </Box>
                    )
                )}
              </Box>
            </Box>
          </Fragment>
        ))
      ) : (
        <EditStepGroup
          recipe={recipe}
          onUpdate={updateRecipe}
          handleClose={() => setStepEdit(false)}
        />
      )}
      {isOwner && !stepEdit && (
        <Box display="flex" justifyContent="center">
          <Box px={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setStepEdit(true)}
            >
              Edit Steps
            </Button>
          </Box>
          <Box px={2}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => deleteRecipe(id)}
            >
              Delete
            </Button>
          </Box>
        </Box>
      )}
    </RecipeTemplate>
  );
}

const useStyle = makeStyles((theme) =>
  createStyles({
    ingredientItem: {
      '& .MuiListItemIcon-root': {
        minWidth: 'max-content',
      },
      '& .MuiCheckbox-root': {
        paddingTop: theme.spacing(0),
        paddingBottom: theme.spacing(0),
      },
    },
  })
);

export default ViewRecipe;
