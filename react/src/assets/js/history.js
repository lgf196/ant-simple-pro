/**
 * @note react-router-dom@5.xx，则应使用history@4.10.1，因为最新版本的历史记录（v5）仅适用于react-router-dom@6.xx
 */
import { createBrowserHistory } from 'history'
export const history = createBrowserHistory({
  basename: process.env.PUBLIC_URL // 就是page.json里面的homepage
});
