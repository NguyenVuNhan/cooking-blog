import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import React from 'react';
import { useForm } from 'react-hook-form';

export interface SearchInputProps {
  onSearch(data: { query: string }): void;
}

export function SearchInput(props: SearchInputProps) {
  const { onSearch } = props;
  const { handleSubmit, register } = useForm<{ query: string }>();
  const { ref, ...rest } = register('query');

  return (
    <form onSubmit={handleSubmit(onSearch)}>
      <InputBase
        placeholder="Search recipe or Ingredient"
        inputProps={{ 'aria-label': 'Search recipe' }}
        className="rounded pl-2 w-100 bg-white mt-2 border"
        inputRef={ref}
        {...rest}
        endAdornment={
          <IconButton type="submit">
            <SearchIcon />
          </IconButton>
        }
      />
    </form>
  );
}

export default SearchInput;
