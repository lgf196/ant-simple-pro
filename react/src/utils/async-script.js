/**
 *
 * @param {String} src url加载地址
 * @param {Object} existVariable 创建的对象
 * @param {Function} callback 回调函数
 */
const asyncLoadScript = (src, existVariable, callback) => {
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
    script.onload = function() {
      // this.onload = null here is necessary
      // because even IE9 works not like others
      this.onerror = this.onload = null
      cb(null, script)
    }
    script.onerror = function() {
      this.onerror = this.onload = null
      cb(new Error('Failed to load ' + src), script)
    }
  }

  function ieOnEnd(script) {
    script.onreadystatechange = function() {
      if (this.readyState !== 'complete' && this.readyState !== 'loaded') return
      this.onreadystatechange = null
      // there is no way to catch loading errors in IE8
      cb(null, script)
    }
  }
}

export default asyncLoadScript;
