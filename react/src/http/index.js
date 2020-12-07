import axios from 'axios'
import { requestCode } from '../utils/varbile'
import { toast } from '../utils/function'
import store from '@/redux/store'
import { push } from 'connected-react-router'
import Tools from '@/utils'
import * as types from '@/redux/constants/actionType'

const tools = new Tools();

axios.defaults.withCredentials = true;

axios.interceptors.request.use(config => {
  if (localStorage.getItem('token')) {
    config.headers['accesstoken'] = localStorage.getItem('token');
  }

  store.dispatch({ type: types.LOADING_START }); // 触发loading设置为true

  return config;

}, error => {
  return Promise.reject(error)
});

axios.interceptors.response.use((response) => {

  let token = response.headers.accesstoken;

  if (token) {
    axios.defaults.headers.common['accesstoken'] = token;
  }

  // if (response.status === 200) {
  store.dispatch({ type: types.LOADING_END }); // 触发loading设置为false
  // }

  return response;

}, (error) => {
  return Promise.reject(error)
});

export const resquest = (method = 'get', url, data = {}, baseURL = '/api', responseType = 'json') => {
  return new Promise((resolve) => {
    let option = {
      method,
      url,
      params: method === 'get' ? tools.delEmptyString(data) : {},
      data: method === 'post' ? tools.delEmptyString(data) : {},
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      transformRequest: [
        function (data) {
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          ret = ret.substring(0, ret.lastIndexOf('&'));
          return ret
        }
      ],
      baseURL,
      responseType
    };
    axios.request(option).then(res => {
      if (res.data.code === requestCode.successCode) {
        resolve(res.data);
      } else if (res.data.code === requestCode.noLoginTokenCode) {
        store.dispatch(push('/login'));
      } else {
        toast(requestCode.failedCode, res.data.mes);
        resolve(res.data);
      }
    }, error => {
      store.dispatch({ type: types.LOADING_END }); // 触发loading设置为false

      error.response && error.response.data ? toast(requestCode.failedCode, error.response.data.mes) : toast(requestCode.failedCode, '请求出错，请重试');
    }).catch((err) => {
      store.dispatch({ type: types.LOADING_END }); // 触发loading设置为false

      toast(requestCode.serverErrorCode, '服务异常');
    })
  })
}
