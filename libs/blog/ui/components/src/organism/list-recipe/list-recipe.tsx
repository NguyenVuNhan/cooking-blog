import { IRecipe } from '@cookingblog/api/interfaces';
import { forwardTo } from '@cookingblog/blog/utils';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import React from 'react';

export interface ListRecipeProps {
  recipes: IRecipe[];
}

export function ListRecipe(props: ListRecipeProps) {
  const { recipes } = props;

  const toRecipe = (id: string | undefined) => () => {
    forwardTo(`/recipe/${id}`);
  };

  return (
    <Grid container spacing={3}>
      {recipes.length === 0 ? (
        <Typography variant="h5" align="center" className="w-100 text-muted">
          No result
        </Typography>
      ) : (
        recipes.map((recipe, index) => (
          <Grid
            container
            key={index}
            item
            xs={12}
            sm={6}
            md={4}
            alignItems="stretch"
          >
            <Card className="w-100 d-flex flex-column">
              <CardContent>
                <Typography variant="h4">{recipe.title}</Typography>
                <div className="d-flex align-item-center">
                  <AccessTimeIcon className="mr-1" />
                  <Typography>{recipe.duration}</Typography>
                </div>
              </CardContent>
              <div className="flex-grow-1"></div>
              <CardActions>
                <Button onClick={toRecipe(recipe._id)}>View recipe</Button>
              </CardActions>
            </Card>
          </Grid>
        ))
      )}
    </Grid>
  );
}

export default ListRecipe;
