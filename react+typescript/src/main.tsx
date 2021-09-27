import 'virtual:svg-icons-register';
import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd';
import locale from 'antd/es/locale/zh_CN';
import { Provider } from 'react-redux';
import store from '@/redux/store';
import Routers from '@/router';
import App from './index';
// import './assets/scss/common.scss';
ReactDOM.render(
  <ConfigProvider locale={locale}>
    <Provider store={store}>
      <Routers />
    </Provider>
  </ConfigProvider>,
  document.getElementById('root'),
);
