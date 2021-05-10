import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import qs from 'qs'
import { message } from 'ant-design-vue'
import { getToken } from '@/utils/local'
import appStore from '@/store/modules/app'
import userStore from '@/store/modules/user'
// import router from '@/router'

const baseURL = '/api'

const FORMDATA_CONTENT_TYPE = 'application/x-www-form-urlencoded'

let loadingCount = 0

function startCount() {
  loadingCount++
  if (!appStore.loading) {
    appStore.SET_LOADING(true)
  }
}

function endCount() {
  loadingCount--
  if (loadingCount === 0) {
    appStore.SET_LOADING(false)
  }
}

const codeMessage: Record<string, string> = {
  400: '请求错误',
  401: '登录状态失效，请重新登录',
  403: '拒绝访问',
  404: '请求地址不存在',
  500: '服务器繁忙',
  502: '网关错误',
  503: '服务不可用，服务器暂时过载或维护',
  504: '网关超时'
}
const genEmptyPromise = () => new Promise(() => {}) // eslint-disable-line

/**
 * 过滤空参数
 * @param {Object} params 参数对象
 */
export const paramsSerializer = (params: Record<string, unknown>) => {
  const data: Record<string, unknown> = {}
  for (const k in params) {
    const value = params[k]
    if (value !== '' && value !== null && value !== undefined) {
      data[k] = value
    }
  }
  return qs.stringify(data)
}
// 声明一个 Map 用于存储每个请求的标识 和 取消函数
const pending = new Map()
/**
 * 添加请求
 * @param {AxiosRequestConfig} config
 */
export const addPending = (config: AxiosRequestConfig) => {
  const url = [
    config.method,
    config.url,
    qs.stringify(config.params),
    qs.stringify(config.data)
  ].join('&')
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken(cancel => {
      if (!pending.has(url)) {
        // 如果 pending 中不存在当前请求，则添加进去
        pending.set(url, cancel)
      }
    })
}
/**
 * 移除请求
 * @param {AxiosRequestConfig} config
 */
export const removePending = (config: AxiosRequestConfig) => {
  const url = [
    config.method,
    config.url,
    qs.stringify(config.params),
    qs.stringify(config.data)
  ].join('&')
  if (pending.has(url)) {
    // 如果在 pending 中存在当前请求标识，需要取消当前请求，并且移除
    const cancel = pending.get(url)
    cancel(url)
    pending.delete(url)
  }
}
/**
 * 清空 pending 中的请求（在路由跳转时调用）
 * @param {Object} config
 */
export const clearPending = () => {
  for (const [url, cancel] of pending) {
    cancel(url)
  }
  pending.clear()
}

const getErrorMsg = (error: AxiosError, errorMsg: string) => {
  let msg = ''
  if (errorMsg) {
    return errorMsg
  }
  // http 错误响应
  if (error.response) {
    const { status } = error.response
    return codeMessage[status]
  }
  // 超时或断网
  if (error.message.includes('timeout')) {
    msg = '请求超时！请检查网络是否正常'
  } else {
    msg = '网络错误，请检查网络是否已连接！'
  }
  return msg || '操作失败'
}

// 请求之前
const requestStart = (
  config: AxiosRequestConfig,
  loadingCb: LoadingCallback,
  showLoading: boolean
) => {
  loadingCb(true)
  startCount()
  if (showLoading) {
    // Loading.open()
  }
  removePending(config) // 在请求开始前，对之前的请求做检查取消操作
  addPending(config) // 添加本次请求到 pending 中
  config.headers = config.headers || {}
  const token = getToken()
  if (token) {
    config.headers.accesstoken = token
  }
}

// 响应正常
type RequestThenEndType = {
  response: AxiosResponse
  loadingCb: LoadingCallback
  showLoading: boolean
  showWarning: boolean
  warningMsg: string
  throwWarningError: boolean
}
const requestThenEnd = (options: RequestThenEndType) => {
  const {
    response,
    loadingCb,
    showLoading,
    showWarning,
    warningMsg,
    throwWarningError
  } = options
  loadingCb(false)
  endCount()
  if (showLoading) {
    // Loading.close()
  }
  removePending(response.config) // 在请求结束后，移除本次请求
  const responseData = response.data || {}
  if (responseData.success) {
    // success code
    return responseData.data
  }
  if (responseData.code === 202) {
    userStore.logout().then(() => {
      // this.$router.replace('/login')
      location.reload(true)
    })
  }
  // not success code
  if (showWarning) {
    message.destroy()
    message.warning(warningMsg || responseData.mes || '操作失败')
  }
  // 抛出业务错误
  if (throwWarningError) {
    const err = new Error(JSON.stringify(responseData, null, 2))
    err.name = 'warning'
    return Promise.reject(err)
  }
  return genEmptyPromise()
}

// 响应异常
type RequestCatchEndType = {
  error: AxiosError
  loadingCb: LoadingCallback
  showLoading: boolean
  showError: boolean
  errorMsg: string
  throwHttpError: boolean
}
const requestCatchEnd = (options: RequestCatchEndType) => {
  const {
    error,
    loadingCb,
    showLoading,
    showError,
    errorMsg,
    throwHttpError
  } = options
  loadingCb(false)
  endCount()
  if (showLoading) {
    // Loading.close()
  }
  if (axios.isCancel(error)) {
    // 取消请求的错误，直接跳过
    console.log('cancel request: ' + error.message)
    return genEmptyPromise()
  }
  if (error.name === 'warning') {
    return Promise.reject(error)
  }
  const msg = getErrorMsg(error, errorMsg)
  if (showError) {
    message.destroy()
    message.warning(msg)
  }
  if (error.response) {
    removePending(error.response.config) // 在请求结束后，移除本次请求
    const { status } = error.response
    if (status === 401) {
      // store.dispatch('user/logout').then(() => {
      //   router.replace('/login')
      // })
    }
  }
  // 抛出http错误
  if (throwHttpError) {
    return Promise.reject(error)
  }
  return genEmptyPromise()
}

const instance = axios.create({
  baseURL,
  // 只作用于 params（手动拼接在 url 后的参数不走这里）
  paramsSerializer,
  // 请求超时时间
  timeout: 10000,
  headers: {
    'Content-Type': FORMDATA_CONTENT_TYPE
  },
  transformRequest: [
    function (data, headers) {
      if (headers['Content-Type'] === FORMDATA_CONTENT_TYPE) {
        return qs.stringify(data, {
          skipNulls: true
        })
      }
      return data
    }
  ]
})
export interface LoadingCallback {
  (status: boolean): void
}

type IAxiosRequest = AxiosRequestConfig & {
  showWarning?: boolean
  showError?: boolean
  showLoading?: boolean
  loadingCb?: LoadingCallback
  throwWarningError?: boolean
  throwHttpError?: boolean
  warningMsg?: string
  errorMsg?: string
}
/**
 * @param {Object} options 请求配置参数
 * @param {Boolean} [options.showWarning=true] 是否显示业务错误提示（请求成功，但业务状态码非成功状态）
 * @param {Boolean} [options.showError=true] 是否显示http错误提示（http请求失败）
 * @param {Boolean} [options.showLoading=true] 是否显示 loading
 * @param {Function} [options.loadingCb=()=>{}] loading 状态回调
 * @param {Boolean} [options.throwWarningError=true] 是否抛出业务逻辑错误（请求成功，但业务状态码非成功状态）
 * @param {Boolean} [options.throwHttpError=true] 是否显示http错误（http请求失败）
 * @param {String} [options.warningMsg=''] 业务错误提示
 * @param {String} [options.errorMsg=''] http错误提示
 * @return {Promise} Promise
 */
const request = (options: IAxiosRequest) => {
  const {
    showWarning = true,
    showError = true,
    showLoading = true,
    loadingCb = () => {}, // eslint-disable-line
    throwWarningError = true,
    throwHttpError = true,
    warningMsg = '',
    errorMsg = '',
    ...config
  } = options
  requestStart(config, loadingCb, showLoading)
  return instance(config)
    .then(response => {
      return requestThenEnd({
        response,
        loadingCb,
        showLoading,
        showWarning,
        warningMsg,
        throwWarningError
      })
    })
    .catch(error => {
      console.log('request catch', error)
      return requestCatchEnd({
        error,
        loadingCb,
        showLoading,
        showError,
        errorMsg,
        throwHttpError
      })
    })
}
export default request

export const get = (url: string, params = {}, options = {}) => {
  const result: IAxiosRequest = {
    method: 'get',
    url,
    params,
    ...options
  }
  return request(result)
}

export const post = (url: string, data = {}, options = {}) => {
  const result: IAxiosRequest = {
    method: 'post',
    url,
    data,
    ...options
  }
  return request(result)
}
