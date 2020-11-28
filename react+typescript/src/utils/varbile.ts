/**
 * @description 状态码
 */
export enum requestCode {
  failedCode = 111, // 失败
  successCode = '000', // 成功
  noLoginTokenCode = 202, // 无token
  noRouterCode = 404, // 路劲找不到
  serverErrorCode = 500 // 服务错误
};

/**
 * @description 响应式的配置参数
 */
export enum responsiveConfig {
  sliderExpansionLeft = 200,
  sliderPackUpLeft = 80,
  sliderMobileLeft = 0,
  collapsedInnerWidth = 1200,
  mobileInnerWidth = 750
}

/**
 * @description token的判断
 * @return {Boolean}
 */
export const isToken = (): boolean => localStorage.getItem('token') ? true : false;

/**
 * @description node运行环境说明
 * @return string
 */
export const environment = () => {
  const env = process.env.NODE_ENV;
  let parps = null;
  switch (env) {
    case 'development': // 开发环境下
      parps = 'development';
      break;
    case 'beta': // 测试环境下
      parps = 'beta';
      break;
    case 'release': // 预发布环境下
      parps = 'release';
      break;
    case 'production': // 正式生产环境下
      parps = 'production';
      break;
    case 'test': // 单元测试环境下
      parps = 'test';
      break;
    default:
      parps = 'development';
      break;
  }
  return parps;
}
