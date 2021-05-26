const asyncLoadScript = (
  src: string,
  existVariable: any,
  callback: (err: Error | null, el: HTMLElement) => void
) => {
  const existingScript = document.getElementById(src)
  const cb = callback || function() {} // eslint-disable-line

  if (!existingScript) {
    const script = document.createElement('script')
    script.src = src
    script.id = src
    document.body.appendChild(script)
    const onEnd = 'onload' in script ? stdOnEnd : ieOnEnd // eslint-disable-line
    onEnd(script) // eslint-disable-line
  }

  if (existingScript && cb) {
    if (existVariable) {
      cb(null, existingScript)
    }
  }

  function stdOnEnd(script: HTMLScriptElement) {
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

  function ieOnEnd(script: any) {
    script.onreadystatechange = function () {
      if (this.readyState !== 'complete' && this.readyState !== 'loaded') return
      this.onreadystatechange = null
      // there is no way to catch loading errors in IE8
      cb(null, script)
    }
  }
}

export default asyncLoadScript
