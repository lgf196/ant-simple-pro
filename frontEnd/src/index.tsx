import React from 'react';
import ReactDOM from 'react-dom';
import Routers from '@/router'
import { ConfigProvider } from 'antd'; 
import 'moment/locale/zh-cn';
import locale from 'antd/es/locale/zh_CN';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import store from '@/redux/store'
import SvgIcon from '@/icons';
// import './il8n'
import './index.css';
import './assets/scss/common.scss'
import './assets/scss/update.antd.css'
import './assets/scss/animate.scss'
SvgIcon();
ReactDOM.render(
   <ConfigProvider locale={locale}>
    <Provider store={store}>
        <Routers />
      </Provider>
  </ConfigProvider>,
  document.getElementById('root')
);
serviceWorker.unregister();
