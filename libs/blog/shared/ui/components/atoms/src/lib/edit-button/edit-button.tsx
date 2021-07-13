import { MouseEventHandler } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import { IconButton } from '@material-ui/core';

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
