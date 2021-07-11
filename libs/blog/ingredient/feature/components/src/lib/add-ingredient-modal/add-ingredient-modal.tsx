import { AddRecipeReq } from '@cookingblog/api/interfaces';
import { RecipeDTO } from '@cookingblog/api/recipe/dto';
import { TextField } from '@cookingblog/blog/shared/ui/components/atoms';
import { ErrorBadge } from '@cookingblog/blog/shared/ui/components/molecules';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DeleteIcon from '@material-ui/icons/Delete';
import React, { Fragment } from 'react';
import {
  FieldError,
  useFieldArray,
  useFormContext,
  useFormState,
  useWatch,
} from 'react-hook-form';
import { IngredientInput } from '../ingredient-input/ingredient-input';

/* eslint-disable-next-line */
export interface AddIngredientModalProps {
  open: boolean;
  handleClose: () => void;
  handleSave?: (ingredients: AddRecipeReq['ingredients']) => void;
  title: string;
}

export function AddIngredientModal(props: AddIngredientModalProps) {
  const { handleClose, handleSave, title, open } = props;
  const classes = useStyle();
  const { register, control, trigger } = useFormContext<RecipeDTO>();
  const { errors } = useFormState({ control });
  const { append, remove, fields } = useFieldArray({
    name: 'ingredients',
    control,
  });
  const ingredientsWatcher = useWatch({
    control,
    name: 'ingredients',
  });

  const deleteIngredient = (index: number) => () => remove(index);
  const addIngredient = () => append({ ingredient: '', quantity: '' });

  const _handleSave = async () => {
    const isValid = await trigger('ingredients');
    if (isValid) {
      handleClose();
      handleSave && handleSave(ingredientsWatcher || []);
    }
  };

  return (
    <Dialog
      title={title}
      open={open}
      onClose={handleClose}
      keepMounted
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Ingredients</DialogTitle>
      <DialogContent dividers>
        <Grid item sm={12}>
          <ErrorBadge
            message={(errors.ingredients as unknown as FieldError)?.message}
          />
        </Grid>
        {fields.map((ingredient, index) => (
          <Fragment key={ingredient.id}>
            <Grid item sm={12} container alignItems="flex-end" spacing={3}>
              <Grid item xs={12} sm={7}>
                <IngredientInput
                  control={control}
                  label="Ingredients"
                  name={`ingredients.${index}.ingredient`}
                  defaultValue={ingredient.ingredient ?? ''}
                  fullWidth
                  margin="none"
                  size="small"
                  error={Boolean(
                    errors.ingredients && errors.ingredients[index]?.ingredient
                  )}
                  helperText={
                    errors.ingredients &&
                    errors.ingredients[index]?.ingredient?.message
                  }
                />
              </Grid>
              <Grid item xs={10} sm={4}>
                <TextField
                  label="quantity"
                  {...register(`ingredients.${index}.quantity` as const)}
                  defaultValue={ingredient.quantity ?? ''}
                  fullWidth
                  margin="none"
                  size="small"
                  error={Boolean(
                    errors.ingredients && errors.ingredients[index]?.quantity
                  )}
                  helperText={
                    errors.ingredients &&
                    errors.ingredients[index]?.quantity?.message
                  }
                />
              </Grid>
              <Grid item xs={2} sm={1}>
                <IconButton onClick={deleteIngredient(index)} className="p-0">
                  <DeleteIcon color="error" />
                </IconButton>
              </Grid>
            </Grid>
          </Fragment>
        ))}
        <Button
          startIcon={<AddCircleOutlineIcon />}
          color="primary"
          onClick={addIngredient}
          className={classes.addBtn}
        >
          Add Ingredient
        </Button>
      </DialogContent>

      <DialogActions>
        <Button color="primary" onClick={_handleSave}>
          Save
        </Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}

const useStyle = makeStyles((theme) => ({
  addBtn: {
    marginTop: theme.spacing(2),
  },
}));

export default AddIngredientModal;
