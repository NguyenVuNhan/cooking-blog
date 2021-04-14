import React, { MouseEventHandler } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

export interface EditButtonProps {
  show?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export function EditButton(props: EditButtonProps) {
  const { show, onClick } = props;

  return (
    show && (
      <IconButton size="small" onClick={onClick}>
        <EditIcon fontSize="inherit" />
      </IconButton>
    )
  );
}

export default EditButton;
