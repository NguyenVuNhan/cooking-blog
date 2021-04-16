import { forwardTo } from '@cookingblog/blog/utils';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import {
  SearchInput,
  SearchInputProps,
  ToolBox,
} from '@cookingblog/blog/ui/components';

export function Home() {
  const classes = useStyles();

  const onSearch: SearchInputProps['onSearch'] = ({ query }) => {
    forwardTo(`recipe/search?q=${query}`);
  };

  return (
    <Container className={classes.container} maxWidth={false}>
      <ToolBox />
      <Box
        height="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <div>
          <Typography align="center" variant="h1">
            Cooking Blog
          </Typography>
          <SearchInput onSearch={onSearch} />
        </div>
      </Box>
    </Container>
  );
}

const useStyles = makeStyles({
  container: {
    width: '100vw',
    height: '100vh',
    alignItems: 'center',
    '& .MuiPaper-root': {
      padding: 16,
      width: 500,
    },
  },
});

export default Home;
