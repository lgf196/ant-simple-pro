import { createBrowserHistory } from 'history';
import { VITE_APP_BASE } from '../../../config/index';
export const history = createBrowserHistory({
  basename: VITE_APP_BASE,
});
