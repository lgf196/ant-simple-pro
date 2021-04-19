/**
 * @description 状态码
 */
export const requestCode = {
  failedCode : 111, // 失败
  successCode : '000', // 成功
  noLoginTokenCode : 202, // 无token
  noRouterCode : 404, // 路劲找不到
  serverErrorCode : 500 // 服务错误
};

/**
 * @description 响应式的配置参数
 */
export const responsiveConfig = {
  sliderExpansionLeft : 200,
  sliderPackUpLeft : 80,
  sliderMobileLeft : 0,
  collapsedInnerWidth : 1200,
  mobileInnerWidth : 750
}

/**
 * @description token的判断
 * @return {Boolean}
 */
export const isToken = () => localStorage.getItem('token') ? true : false;

/**
 * @description node运行环境说明
 * @return string
 */
export const environment = () => {
  const env = process.env.REACT_APP_ANT;
  let parps = null;
  switch (env) {
    case 'dev': // 开发环境下
      parps = 'dev';
      break;
    case 'alpha': // 测试环境下
      parps = 'alpha';
      break;
    case 'preprod': // 预发布环境下
      parps = 'preprod';
      break;
    case 'prod': // 正式生产环境下
      parps = 'prod';
      break;
    default:
      parps = 'development';
      break;
  }
  return parps;
}

/**
 * @description 生成随机26位字符串
 * @return {String} 字符串
 */
 export const getRandomStr = () => {
  return new Date().getTime() + Math.random().toString(16).slice(2)
}

/**
 * @author lgf
 * @description 判断json是否为空
 * @param {Object} json
 * @return {Number} 将有值得数据进行累加
 */
 export const isJsonVal = (json) => {
  let jsonLength = 0;
  for (var i in json){
    if(json[i]!==undefined && json[i]!=='undefined' && json[i]!==null){
      jsonLength++;
    }
  }
  return jsonLength;
}
