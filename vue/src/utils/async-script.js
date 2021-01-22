/**
 * 动态加载 js 文件
 * @param {String} src js 文件路径
 * @param {Any} existVariable 在全局声明的变量，如：window.echarts
 * @param {Function} callback 回调函数
 * @return {void}
 */
function asyncLoadScript(src, existVariable, callback) {
  const existingScript = document.getElementById(src)
  const cb = callback || function() {} // eslint-disable-line

  if (!existingScript) {
    const script = document.createElement('script')
    script.src = src
    script.id = src
    document.body.appendChild(script)
    const onEnd = 'onload' in script ? stdOnEnd : ieOnEnd
    onEnd(script)
  }

  if (existingScript && cb) {
    if (existVariable) {
      cb(null, existingScript)
    }
  }

  function stdOnEnd(script) {
    script.onload = function () {
      // this.onload = null here is necessary
      // because even IE9 works not like others
      this.onerror = this.onload = null
      cb(null, script)
    }
    script.onerror = function () {
      this.onerror = this.onload = null
      cb(new Error('Failed to load ' + src), script)
    }
  }

  function ieOnEnd(script) {
    script.onreadystatechange = function () {
      if (this.readyState !== 'complete' && this.readyState !== 'loaded') return
      this.onreadystatechange = null
      // there is no way to catch loading errors in IE8
      cb(null, script)
    }
  }
}

export default asyncLoadScript
