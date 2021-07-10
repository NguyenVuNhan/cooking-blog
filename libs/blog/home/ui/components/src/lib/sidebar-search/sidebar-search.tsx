import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import React from 'react';
import { useForm } from 'react-hook-form';

export interface SidebarSearchProps {
  onSearch(data: { query: string }): void;
}

export function SidebarSearch(props: SidebarSearchProps) {
  const { onSearch } = props;
  const { handleSubmit, register } = useForm<{ query: string }>();
  const { ref, ...rest } = register('query');

  return (
    <div className="flex flex-col justify-center">
      <p className="hidden md:block text-4xl text-center">Search</p>
      <form onSubmit={handleSubmit(onSearch)} className="md:px-2">
        <InputBase
          placeholder="Search recipe or Ingredient"
          inputProps={{ 'aria-label': 'Search recipe' }}
          className="rounded-full pl-2 md:px-2 bg-white py-0 md:py-2 md:my-2 border"
          inputRef={ref}
          {...rest}
          fullWidth
          endAdornment={
            <IconButton type="submit" size="small">
              <SearchIcon />
            </IconButton>
          }
        />
      </form>
    </div>
  );
}

export default SidebarSearch;
