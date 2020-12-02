/**
 * 添加可在应用程序内的任何组件实例中访问的全局属性，约定以 $ 开头
 */
export default function(app) {
  const g = app.config.globalProperties
  g.$pageSizes = [ 10, 20, 30, 40 ]
  g.$paginationLayout = 'total, sizes, prev, pager, next, jumper'
  g.$dialogModalClose = false
  g.$dialogEscClose = false
  g.$QINIU_UPLOAD_URL = 'https://upload-z2.qiniup.com'
  g.$QINIU_PREFIX = 'https://qiniu.qyhever.com/'
}
