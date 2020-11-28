import {createBrowserHistory } from 'history' // hash模式
export const history = createBrowserHistory({
    basename: process.env.PUBLIC_URL // 就是page.json里面的homepage
  });