import {
  ShoppingListCtx,
  ShoppingListItem,
} from '@cookingblog/blog/shopping-list/data-access';
import Checkbox from '@material-ui/core/Checkbox';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ViewItemProps } from '../propTypes';
import React, { useContext, useState } from 'react';

export type AislesViewItemProps = ViewItemProps;

export function AislesViewItem(props: AislesViewItemProps) {
  const { label, shoppingListItems } = props;

  const [expand, setExpand] = useState(false);
  const { removeItem } = useContext(ShoppingListCtx);

  const handleClick = () => {
    setExpand(!expand);
  };

  return (
    <>
      <ListItem className="pb-0" disableGutters>
        <ListItemIcon>
          <Checkbox />
        </ListItemIcon>
        <ListItemText primary={label} className="h-100" />
        <IconButton onClick={handleClick} size="small">
          {expand ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </ListItem>
      <Collapse in={expand} timeout="auto">
        <List>
          {shoppingListItems.map((item, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={item.description}
                secondary={item.recipe}
                className="ml-5"
              />
              <IconButton
                onClick={() => removeItem(item.recipe, item.item)}
                size="small"
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

export default AislesViewItem;
