import {
  ShoppingListCtx,
  ShoppingListItem,
} from '@cookingblog/blog/shopping-list/data-access';
import {
  Checkbox,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ViewItemProps } from '../propTypes';
import { useContext, useState } from 'react';

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
