import UndoIcon from '@material-ui/icons/Undo';
import RedoIcon from '@material-ui/icons/Redo';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { useGetRandomRecipeQuery } from '@cookingblog/blog/recipe/data-access';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';

/* eslint-disable-next-line */
export interface RandomRecipeProps {}

export function RandomRecipe(props: RandomRecipeProps) {
  const classes = useStyles();
  const { data, isLoading, refetch } = useGetRandomRecipeQuery({});

  return (
    <div className="w-full h-full flex flex-col">
      <Typography align="center" variant="h1" className="mb-2">
        Cooking Blog
      </Typography>
      <div className="w-full flex-grow-1 flex flex-col justify-center items-center">
        <Paper
          className={`flex flex-col overflow-hidden ${classes.recipe} ${
            isLoading && 'loading'
          }`}
          elevation={3}
        >
          <span className="flex-grow-1"></span>
          {data && (
            <div className="px-2 pt-10 pb-2 bg-gradient-to-t from-black to-transparent text-white">
              <Link className="text-4xl" to={`/recipe/${data.id}`}>
                {data.title}
              </Link>
              <p>
                {data.duration} - {data.steps.length} steps
              </p>
            </div>
          )}
          <div className="flex w-full justify-center bg-black pb-2 px-2">
            <IconButton
              onClick={() => refetch()}
              color="secondary"
              size="medium"
            >
              <UndoIcon fontSize="large" />
            </IconButton>
            <span className="px-2"></span>
            <IconButton
              onClick={() => refetch()}
              color="secondary"
              size="medium"
            >
              <RedoIcon fontSize="large" />
            </IconButton>
          </div>
        </Paper>
      </div>
    </div>
  );
}

const useStyles = makeStyles({
  recipe: {
    backgroundImage: `url(/assets/default/recipe.jpg)`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    maxWidth: 400,
    width: '100%',
    height: 667,
    maxHeight: 'calc(100%-20px)',
    '&.loading': {
      backgroundImage: `url(/assets/default/recipe-loading.png)`,
    },
  },
});

export default RandomRecipe;
