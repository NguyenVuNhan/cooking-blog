import { ShoppingListCtx } from '@cookingblog/blog/shopping-list/data-access';
import {
  Checkbox,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import BookIcon from '@material-ui/icons/Book';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React, { useContext, useState } from 'react';
import { ViewItemProps } from '../propTypes';

export type RecipesViewItemProps = ViewItemProps;

export function RecipesViewItem(props: RecipesViewItemProps) {
  const { label, shoppingListItems } = props;

  const [expand, setExpand] = useState(false);
  const { removeItem } = useContext(ShoppingListCtx);

  const handleClick = () => {
    setExpand(!expand);
  };

  return (
    <>
      <ListItem className="pb-0" disableGutters button onClick={handleClick}>
        <ListItemIcon>
          <BookIcon />
        </ListItemIcon>
        <ListItemText primary={label} />
        <IconButton size="small" onClick={() => removeItem(label)}>
          <DeleteIcon />
        </IconButton>
        {expand ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItem>
      <Collapse in={expand} timeout="auto">
        <List>
          {shoppingListItems.map((item, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <Checkbox />
              </ListItemIcon>
              <ListItemText
                primary={item.description}
                secondary={item.recipe}
              />
              <IconButton
                size="small"
                className="mr-1"
                onClick={() => removeItem(label, item.item)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  );
}

export default RecipesViewItem;
