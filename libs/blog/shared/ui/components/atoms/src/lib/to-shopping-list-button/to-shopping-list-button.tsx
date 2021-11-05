import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveIcon from '@mui/icons-material/Remove';

export interface ToShoppingListButtonProps {
  onSelect?: () => void;
  onRemove?: () => void;
}

export function ToShoppingListButton(props: ToShoppingListButtonProps) {
  const { onSelect, onRemove } = props;
  const [added, setAdded] = useState(false);

  const onClick = () => {
    !added ? onSelect && onSelect() : onRemove && onRemove();
    setAdded(!added);
  };

  return (
    <IconButton
      size="small"
      color="primary"
      onClick={onClick}
      data-testid="btn"
    >
      {added ? (
        <RemoveIcon fontSize="inherit" data-testid="remove-icon" />
      ) : (
        <AddCircleIcon fontSize="inherit" data-testid="add-icon" />
      )}
    </IconButton>
  );
}

export default ToShoppingListButton;
