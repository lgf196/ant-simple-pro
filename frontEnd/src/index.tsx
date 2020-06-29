import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routers from '@/router'
import { ConfigProvider } from 'antd'; 
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <>
   <ConfigProvider locale={zh_CN}>
      <Routers />
  </ConfigProvider>
  </>,
  document.getElementById('root')
);
serviceWorker.unregister();
