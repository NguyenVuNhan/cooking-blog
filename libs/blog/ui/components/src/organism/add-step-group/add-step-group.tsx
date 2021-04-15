import { AddRecipeReq } from '@cookingblog/api-interfaces';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React from 'react';
import {
  Control,
  FieldErrors,
  useFieldArray,
  UseFormRegister,
} from 'react-hook-form';

export interface AddStepGroupProps {
  control: Control<AddRecipeReq>;
  errors: FieldErrors<AddRecipeReq>;
  register: UseFormRegister<AddRecipeReq>;
  ingredients: string[];
  stepIngredient: string[][];
}

export function AddStepGroup(props: AddStepGroupProps) {
  const { control, errors, register, ingredients, stepIngredient } = props;

  const { append, remove, fields } = useFieldArray({
    control,
    keyName: 'id',
    name: 'steps',
  });

  const removeStep = (index: number) => () => remove(index);
  const addStep = () => append({ description: '', ingredients: [] });

  return (
    <>
      {fields.map((step, index) => {
        const { ref: descriptionRef, ...descriptionRest } = register(
          `steps.${index}.description` as const,
          {
            required: 'Description required',
          }
        );

        return (
          <React.Fragment key={index}>
            <Grid item sm={12} className="d-flex align-items-center">
              <Typography variant="h6">Step: {index + 1}</Typography>
              <IconButton aria-label="delete" onClick={removeStep(index)}>
                <DeleteIcon color="error" fontSize="small" />
              </IconButton>
            </Grid>
            <Grid item sm={8}>
              <TextField
                label="Description"
                inputRef={descriptionRef}
                {...descriptionRest}
                defaultValue={step.description}
                error={Boolean(
                  errors.steps && errors.steps[index]?.description
                )}
                helperText={
                  errors.steps && errors.steps[index]?.description?.message
                }
                fullWidth
              />
            </Grid>
            <Grid item sm={4}>
              <Autocomplete
                multiple
                filterSelectedOptions
                onChange={(_event, value) => {
                  stepIngredient[index] = value;
                }}
                id="tags-filled"
                options={ingredients}
                defaultValue={step.ingredients}
                renderTags={(value: string[], getTagProps) =>
                  value.map((option: string, index: number) => (
                    <Chip
                      key={index}
                      size="small"
                      label={option}
                      {...getTagProps({ index })}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name={`steps[${index}].ingredients`}
                    label="Ingredients"
                  />
                )}
              />
            </Grid>
          </React.Fragment>
        );
      })}
      <Grid item container alignItems="center" justify="center" sm={12}>
        <Button color="primary" variant="contained" onClick={addStep}>
          Add New Step
        </Button>
      </Grid>
    </>
  );
}

export default AddStepGroup;
