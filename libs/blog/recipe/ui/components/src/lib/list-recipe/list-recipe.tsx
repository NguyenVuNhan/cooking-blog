import { IRecipe } from '@cookingblog/api/recipe';
import { forwardTo } from '@cookingblog/blog/shared/utils';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

export interface ListRecipeProps {
  recipes: IRecipe[];
}

export function ListRecipe(props: ListRecipeProps) {
  const { recipes } = props;

  const toRecipe = (id: string | undefined) => () => {
    forwardTo(`/recipe/${id}`);
  };

  return (
    <Grid container spacing={2}>
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
            lg={4}
            alignItems="stretch"
          >
            <Card className="w-100 d-flex flex-column relative">
              <div className="aspect-w-12 aspect-h-9"></div>
              <CardMedia
                className="absolute inset-0"
                image={recipe.image ?? '/assets/default/recipe.jpg'}
              />
              <CardContent className="flex-grow-1 z-10 bg-gradient-to-t from-black via-grey-900 to-transparent text-white">
                <Typography variant="h5" className="mt-4">
                  {recipe.title}
                </Typography>
                <div className="d-flex align-item-center">
                  <AccessTimeIcon className="mr-1" />
                  <Typography>{recipe.duration}</Typography>
                </div>
              </CardContent>
              <CardActions className="bg-black z-10 text-white">
                <Button onClick={toRecipe(recipe.id)} color="inherit">
                  View recipe
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))
      )}
    </Grid>
  );
}

export default ListRecipe;
