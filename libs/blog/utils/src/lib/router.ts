import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

export const forwardTo = (location: string): void => {
  history.push(location);
};

export const toLogin = (): void => {
  forwardTo('/login');
};

export const goBack = (): void => {
  history.goBack();
};

export const appendToPath = (str: string) => {
  history.replace(`${history.location.pathname}${str}`);
};

export const getQuery = (variable: string) => {
  const query = history.location.search.substring(1);

  const vars = query.split('&');
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=');
    if (pair[0] === variable) {
      return pair[1];
    }
  }
  return false;
};
