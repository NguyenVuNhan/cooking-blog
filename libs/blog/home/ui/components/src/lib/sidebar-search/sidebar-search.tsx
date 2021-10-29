import SearchIcon from '@material-ui/icons/Search';
import {
  Collapse,
  IconButton,
  InputBase,
  MenuItem,
  TextField,
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { TMeal } from '@cookingblog/api/recipe/dto';
import { useState } from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import { SearchData } from '@cookingblog/blog/recipe/data-access';

export interface SidebarSearchProps {
  onSearch(data: SearchData): void;
}

export function SidebarSearch(props: SidebarSearchProps) {
  const { onSearch } = props;
  const { handleSubmit, register } = useForm<SearchData>();
  const { ref, ...rest } = register('query');
  const [expand, setExpand] = useState(false);

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
            <>
              <IconButton type="submit" size="small">
                <SearchIcon />
              </IconButton>
              <IconButton
                type="submit"
                size="small"
                onClick={() => setExpand(!expand)}
              >
                <SettingsIcon />
              </IconButton>
            </>
          }
        />

        <Collapse in={expand} unmountOnExit className="px-4">
          <TextField
            label="Meal"
            {...register('meal')}
            fullWidth
            InputProps={{ className: 'capitalize' }}
            select
            variant="standard"
            required={false}
          >
            {['breakfast', 'lunch', 'snack', 'dinner'].map((type) => (
              <MenuItem key={type} value={type} className="capitalize">
                {type}
              </MenuItem>
            ))}
          </TextField>
        </Collapse>
      </form>
    </div>
  );
}

export default SidebarSearch;
