import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import React, { useRef, useState } from 'react';
import { Control, Controller, Path } from 'react-hook-form';
import { mapStringMatch, throttle } from '@cookingblog/shared/utils';
import { useIsMounted } from '@cookingblog/shared/web/hooks';
import { ingredientServices } from '@cookingblog/shared/data-access/cooking-blog-api';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

export interface IngredientInputProps<TFieldValues>
  extends Omit<TextFieldProps, 'name'> {
  control: Control<TFieldValues>;
  name: string;
}

export function IngredientInput<TFieldValues>(
  props: IngredientInputProps<TFieldValues>
) {
  const { control, name, defaultValue, ...rest } = props;
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const isMounted = useIsMounted();
  const loading = useRef(false);

  const fetch = React.useMemo(
    () =>
      throttle((name: string) => {
        loading.current = true;
        if (name.length > 0)
          ingredientServices
            .getIngredients(name)
            .then((res) => {
              isMounted && setOptions(res.data.ingredients);
              loading.current = false;
            })
            .catch(() => {
              loading.current = false;
            });
      }, 2000),
    [isMounted]
  );

  const onInputChange = (
    _event: React.ChangeEvent<Record<string, unknown>>,
    value: string
  ): void => {
    if (value === '') {
      isMounted && setOptions([]);
      return;
    }

    fetch(value);
  };

  return (
    <Controller
      name={name as Path<TFieldValues>}
      control={control}
      defaultValue={defaultValue}
      render={({ field, formState }) => (
        <Autocomplete
          value={(field.value as string) || ''}
          options={options}
          getOptionLabel={(option) => option}
          renderOption={(option, { inputValue }) => {
            return (
              <div>
                {mapStringMatch(option, inputValue, (element, match, i) => (
                  <span key={i} style={{ fontWeight: match ? 700 : 400 }}>
                    {element}
                  </span>
                ))}
              </div>
            );
          }}
          open={open}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          onInputChange={onInputChange}
          loading={loading.current}
          renderInput={(params) => (
            <TextField
              {...params}
              {...field}
              {...rest}
              variant={rest.variant}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {loading.current ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
            />
          )}
          freeSolo
        />
      )}
    />
  );
}

export default IngredientInput;
