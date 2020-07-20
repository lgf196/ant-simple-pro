import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routers from '@/router'
import { ConfigProvider } from 'antd'; 
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import store from '@/redux/store'
ReactDOM.render(
  <>
   <ConfigProvider locale={zh_CN}>
    <Provider store={store}>
        <Routers />
      </Provider>
  </ConfigProvider>
  </>,
  document.getElementById('root')
);
serviceWorker.unregister();
