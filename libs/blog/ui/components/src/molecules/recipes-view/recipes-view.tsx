import {
  ShoppingListCtx,
  ShoppingListItem,
} from '@cookingblog/blog/data-access/context';
import Checkbox from '@material-ui/core/Checkbox';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BookIcon from '@material-ui/icons/Book';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React, { useContext, useState } from 'react';

interface ShoppingList {
  [key: string]: ShoppingListItem[];
}

interface ItemProps {
  label: string;
  shoppingListItems: ShoppingListItem[];
}

function Item(props: ItemProps) {
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
        <List component="div">
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

/* eslint-disable-next-line */
export interface RecipesViewProps {}

export function RecipesView(props: RecipesViewProps) {
  const { shoppingList } = useContext(ShoppingListCtx);

  const data: ShoppingList = shoppingList.reduce((prev, curr) => {
    if (prev[curr.recipe] !== undefined) {
      prev[curr.recipe].push(curr);
    } else {
      prev[curr.recipe] = [curr];
    }
    return prev;
  }, {} as ShoppingList);

  return (
    <List>
      {Object.keys(data).map((value, index) => (
        <Item key={index} label={value} shoppingListItems={data[value]} />
      ))}
    </List>
  );
}

export default RecipesView;
