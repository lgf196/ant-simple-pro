import 'virtual:svg-icons-register';
import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd';
import locale from 'antd/es/locale/zh_CN';
import App from './index';
ReactDOM.render(
  <ConfigProvider locale={locale}>
    <App />
  </ConfigProvider>,
  document.getElementById('root'),
);
