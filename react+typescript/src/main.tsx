import 'virtual:svg-icons-register';
import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd';
import locale from 'antd/es/locale/zh_CN';
import { Provider } from 'react-redux';
import store from '@/redux/store';
import Routers from '@/router';
import './index.css';
import './assets/scss/common.scss';
import './assets/scss/update.antd.css';
import './assets/scss/animate.scss';
ReactDOM.render(
  <ConfigProvider locale={locale}>
    <Provider store={store}>
      <Routers />
    </Provider>
  </ConfigProvider>,
  document.getElementById('root'),
);
