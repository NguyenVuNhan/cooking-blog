import { ShoppingListProvider } from '@cookingblog/blog/data-access/context';
import { ShoppingList } from '@cookingblog/blog/ui/components';
import { BlogUiViews } from '@cookingblog/blog/ui/views';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, Route, Switch } from 'react-router-dom';
import GlobalStyle from './GlobalStyle';
import theme from './theme';

export const App = () => {
  const dispatch = useDispatch();

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyle />
      <ShoppingListProvider>
        <Switch>
          <Route
            path="/"
            exact
            render={() => (
              <div>
                This is the generated root route.{' '}
                <Link to="/page-2">Click here for page 2.</Link>
              </div>
            )}
          />
          <Route path="/views" component={BlogUiViews} />
          <Route
            path="/page-2"
            exact
            render={() => (
              <div>
                <Link to="/">Click here to go back to root page.</Link>
              </div>
            )}
          />
        </Switch>
        <ShoppingList />
      </ShoppingListProvider>
    </MuiThemeProvider>
  );
};

export default App;
