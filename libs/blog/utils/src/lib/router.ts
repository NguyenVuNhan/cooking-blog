import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

export const forwardTo = (location: string): void => {
  history.push(location);
};

export const toLogin = (): void => {
  forwardTo('/login');
};
