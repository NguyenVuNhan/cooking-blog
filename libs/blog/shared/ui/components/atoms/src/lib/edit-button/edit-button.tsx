import { MouseEventHandler } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';

export interface EditButtonProps {
  show?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export function EditButton(props: EditButtonProps) {
  const { show = true, onClick } = props;

  return (
    show && (
      <IconButton size="small" onClick={onClick} data-testid="icon-btn">
        <EditIcon fontSize="inherit" />
      </IconButton>
    )
  );
}

export default EditButton;
