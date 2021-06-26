import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { RecipeDTO } from '@cookingblog/api/recipe/dto';
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
  Controller,
  useFieldArray,
  useFormContext,
  useFormState,
} from 'react-hook-form';

export interface AddStepGroupProps {
  ingredients: string[];
  stepIngredient: string[][];
}

export function AddStepGroup(props: AddStepGroupProps) {
  const { ingredients, stepIngredient } = props;
  const { register, control } = useFormContext<RecipeDTO>();
  const { errors } = useFormState();
  const { append, remove, fields, move } = useFieldArray({
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
          `steps.${index}.description` as const
        );

        const key = index + step.description + step.ingredients.length;
        return (
          <React.Fragment key={key}>
            <Grid item sm={12} className="d-flex align-items-center">
              <Typography variant="h6">Step: {index + 1}</Typography>
              <IconButton aria-label="delete" onClick={removeStep(index)}>
                <DeleteIcon color="error" fontSize="small" />
              </IconButton>
              {index > 0 && (
                <IconButton
                  onClick={() => move(index, index - 1)}
                  color="secondary"
                >
                  <ArrowUpwardIcon color="primary" fontSize="small" />
                </IconButton>
              )}
              {index < fields.length - 1 && (
                <IconButton onClick={() => move(index, index + 1)}>
                  <ArrowDownwardIcon color="primary" fontSize="small" />
                </IconButton>
              )}
            </Grid>
            <Grid item xs={12} sm={8}>
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
            <Grid item xs={12} sm={4}>
              <Controller
                render={(props) => (
                  <Autocomplete
                    {...props.field}
                    multiple
                    filterSelectedOptions
                    onChange={(_event, value) => {
                      stepIngredient[index] = value;
                      props.field.onChange(value);
                    }}
                    options={ingredients}
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
                        label="Ingredients"
                        error={props.fieldState.invalid}
                        helperText={props.fieldState.error?.message ?? ''}
                      />
                    )}
                  />
                )}
                name={`steps.${index}.ingredients` as const}
                control={control}
                defaultValue={step.ingredients as never}
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
