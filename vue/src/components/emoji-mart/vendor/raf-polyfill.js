// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

// MIT license

const isWindowAvailable = typeof window !== 'undefined'

isWindowAvailable &&
  (function () {
    let lastTime = 0
    const vendors = ['ms', 'moz', 'webkit', 'o']

    for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame']
      window.cancelAnimationFrame =
        window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame']
    }

    if (!window.requestAnimationFrame)
      window.requestAnimationFrame = function (callback) {
        const currTime = new Date().getTime()
        const timeToCall = Math.max(0, 16 - (currTime - lastTime))
        const val = currTime + timeToCall
        const id = window.setTimeout(() => {
          callback && callback(val)
        }, timeToCall)

        lastTime = val
        return id
      }

    if (!window.cancelAnimationFrame)
      window.cancelAnimationFrame = function (id) {
        clearTimeout(id)
      }
  })()
