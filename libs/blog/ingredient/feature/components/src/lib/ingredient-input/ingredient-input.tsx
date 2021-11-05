import { getIngredients } from '@cookingblog/blog/ingredient/data-access';
import { mapStringMatch, throttle } from '@cookingblog/shared/utils';
import { useIsMounted } from '@cookingblog/shared/web/hooks';
import {
  Autocomplete,
  CircularProgress,
  TextField,
  TextFieldProps,
} from '@mui/material';
import React, { useRef, useState } from 'react';
import {
  Control,
  Controller,
  Path,
  PathValue,
  UnpackNestedValue,
} from 'react-hook-form';

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
      throttle(
        (name: string) => {
          loading.current = true;
          if (name.length > 0)
            getIngredients(name)
              .then((res) => {
                isMounted() && setOptions(res.data.ingredients);
                loading.current = false;
              })
              .catch(() => {
                loading.current = false;
              });
        },
        2000,
        { leading: false }
      ),
    [isMounted]
  );

  const onInputChange = (_event: React.SyntheticEvent, value: string): void => {
    if (value === '') {
      isMounted() && setOptions([]);
      return;
    }

    fetch(value);
  };

  return (
    <Controller
      name={name as Path<TFieldValues>}
      control={control}
      defaultValue={
        defaultValue as UnpackNestedValue<
          PathValue<TFieldValues, Path<TFieldValues>>
        >
      }
      render={({ field: { onChange, value, name } }) => (
        <Autocomplete
          value={(value as string) || ''}
          options={options}
          getOptionLabel={(option) => option}
          renderOption={(_, option, { inputValue }) => {
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
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          onInputChange={(event, value) => {
            onInputChange(event, value);
            onChange(value);
          }}
          loading={loading.current}
          fullWidth={rest.fullWidth}
          renderInput={(params) => (
            <TextField
              {...params}
              {...rest}
              name={name}
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
