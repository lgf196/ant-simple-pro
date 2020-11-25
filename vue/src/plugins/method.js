/**
 * 添加可在应用程序内的任何组件实例中访问的全局方法，约定以 $ 开头
 */
export default function(app) {
  const g = app.config.globalProperties
  g.$imageErrorHandler = function() {
    return true
  }
}
