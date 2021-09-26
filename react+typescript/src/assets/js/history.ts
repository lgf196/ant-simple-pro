import { createBrowserHistory } from 'history'
export const history = createBrowserHistory({
  basename: process.env.PUBLIC_URL // 就是page.json里面的homepage
});
