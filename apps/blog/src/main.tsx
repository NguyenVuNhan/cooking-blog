import 'reflect-metadata';
import store from '@cookingblog/blog/data-access/store';
import { history } from '@cookingblog/blog/utils';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import App from './app/app';

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
