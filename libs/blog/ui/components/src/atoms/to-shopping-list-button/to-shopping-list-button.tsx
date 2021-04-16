import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveIcon from '@material-ui/icons/Remove';

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
    <IconButton size="small" color="primary" onClick={onClick}>
      {added ? (
        <RemoveIcon fontSize="inherit" />
      ) : (
        <AddCircleIcon fontSize="inherit" />
      )}
    </IconButton>
  );
}

export default ToShoppingListButton;
