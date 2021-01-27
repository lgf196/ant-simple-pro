import { isDefined } from './type'

/**
 * 打开文件选择框
 * @return {Promise<File>} Promise
 */
export function createImageFileInput() {
  return new Promise(resolve => {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.onchange = e => {
      const file = e.target.files[0]
      resolve(file)
    }
    input.click()
    input.remove()
  })
}

/**
 * 让任意元素滚动到指定位置
 * @param  {HTMLElement} el 元素
 * @param  {Number} from 开始位置
 * @param  {Number} to 结束位置
 * @param  {Number} duration 使用时间
 * @param  {Function} endCallback 完成后回调
 * @example scrollTo(window, window.pageYOffset, 0, 1000)
 */
export function scrollTo(el, from = 0, to, duration = 500, endCallback) {
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame =
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        return window.setTimeout(callback, 1000 / 60)
      }
  }
  const difference = Math.abs(from - to)
  const step = Math.ceil((difference / duration) * 50)

  function scroll(start, end, step) {
    if (start === end) {
      endCallback && endCallback()
      return
    }

    let d = start + step > end ? end : start + step
    if (start > end) {
      d = start - step < end ? end : start - step
    }

    if (el === window) {
      window.scrollTo(d, d)
    } else {
      el.scrollTop = d
    }
    window.requestAnimationFrame(() => scroll(d, end, step))
  }
  scroll(from, to, step)
}

/**
 * 字符串去除空格
 * @param {String} string 字符串
 * @return {String} 字符串
 */
function trim(string) {
  return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '')
}

/**
 * 元素是否拥有某个类名
 * @param {HTMLElement} el dom元素
 * @param {String} cls 类名
 * @return {Boolean} 结果
 */
export function hasClass(el, cls) {
  if (!el || !cls) {
    return false
  }
  if (cls.indexOf(' ') !== -1)
    throw new Error('className should not contain space.')
  if (el.classList) {
    return el.classList.contains(cls)
  }
  return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1
}

/**
 * 元素添加类名
 * @param {HTMLElement} el dom元素
 * @param {String} cls 类名
 * @return {void}
 */
export function addClass(el, cls) {
  if (!el) {
    return
  }
  let curClass = el.className
  const classes = (cls || '').split(' ')

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i]
    if (!clsName) {
      continue
    }

    if (el.classList) {
      el.classList.add(clsName)
    } else if (!hasClass(el, clsName)) {
      curClass += ' ' + clsName
    }
  }
  if (!el.classList) {
    el.className = curClass
  }
}

/**
 * 元素移除类名
 * @param {HTMLElement} el dom元素
 * @param {String} cls 类名
 * @return {void}
 */
export function removeClass(el, cls) {
  if (!el || !cls) {
    return
  }
  const classes = cls.split(' ')
  let curClass = ' ' + el.className + ' '

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i]
    if (!clsName) {
      continue
    }

    if (el.classList) {
      el.classList.remove(clsName)
    } else if (hasClass(el, clsName)) {
      curClass = curClass.replace(' ' + clsName + ' ', ' ')
    }
  }
  if (!el.classList) {
    el.className = trim(curClass)
  }
}

const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g // eslint-disable-line
const MOZ_HACK_REGEXP = /^moz([A-Z])/
const ieVersion = Number(document.documentMode)

/**
 * style 属性 从连字符格式转换为 驼峰格式
 * @param {String} name 属性名
 * @return {String} style 属性的驼峰格式
 */
export function camelCase(name) {
  return name
    .replace(SPECIAL_CHARS_REGEXP, (_, separator, letter, offset) => {
      return offset ? letter.toUpperCase() : letter
    })
    .replace(MOZ_HACK_REGEXP, 'Moz$1')
}

/**
 * 绑定事件
 * @param {HTMLElement} element dom元素
 * @return {String} event 事件名
 * @return {Function} handler 事件处理函数
 * @return {void}
 */
export const on = (function () {
  if (document.addEventListener) {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false)
      }
    }
  }
  return function (element, event, handler) {
    if (element && event && handler) {
      element.attachEvent('on' + event, handler)
    }
  }
})()

/**
 * 解绑事件
 * @param {HTMLElement} element dom元素
 * @return {String} event 事件名
 * @return {Function} handler 事件处理函数
 * @return {void}
 */
export const off = (function () {
  if (document.removeEventListener) {
    return function (element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false)
      }
    }
  }
  return function (element, event, handler) {
    if (element && event) {
      element.detachEvent('on' + event, handler)
    }
  }
})()

/**
 * 判断 dom 元素是否是可滚动容器
 * @param {HTMLElement} el dom元素
 * @param {Boolean} vertical 是否纵向滚动
 * @return {Boolean} 判断结果
 */
export function isScroll(el, vertical) {
  const determinedDirection = isDefined(vertical)
  const overflow = determinedDirection
    ? vertical
      ? getStyle(el, 'overflow-y')
      : getStyle(el, 'overflow-x')
    : getStyle(el, 'overflow')

  return overflow.match(/(scroll|auto)/)
}

/**
 * 获取 dom 元素样式
 * @param {HTMLElement} element dom元素
 * @param {String} styleName 样式属性名
 * @return {String} style 样式
 */
export const getStyle =
  ieVersion < 9
    ? function (element, styleName) {
        if (!element || !styleName) return null
        styleName = camelCase(styleName)
        if (styleName === 'float') {
          styleName = 'styleFloat'
        }
        try {
          switch (styleName) {
            case 'opacity':
              try {
                return element.filters.item('alpha').opacity / 100
              } catch (e) {
                return 1.0
              }
            default:
              return element.style[styleName] || element.currentStyle
                ? element.currentStyle[styleName]
                : null
          }
        } catch (e) {
          return element.style[styleName]
        }
      }
    : function (element, styleName) {
        if (!element || !styleName) return null
        styleName = camelCase(styleName)
        if (styleName === 'float') {
          styleName = 'cssFloat'
        }
        try {
          const computed = document.defaultView.getComputedStyle(element, '')
          return element.style[styleName] || computed
            ? computed[styleName]
            : null
        } catch (e) {
          return element.style[styleName]
        }
      }

/**
 * 设置 dom 元素样式
 * @param {HTMLElement} element dom元素
 * @param {String} styleName 样式属性名
 * @param {String} value 样式属性值
 * @return {void}
 */
export function setStyle(element, styleName, value) {
  if (!element || !styleName) {
    return
  }

  if (typeof styleName === 'object') {
    for (const prop in styleName) {
      if (Object.prototype.hasOwnProperty.call(styleName, prop)) {
        setStyle(element, prop, styleName[prop])
      }
    }
  } else {
    styleName = camelCase(styleName)
    if (styleName === 'opacity' && ieVersion < 9) {
      element.style.filter = isNaN(value)
        ? ''
        : 'alpha(opacity=' + value * 100 + ')'
    } else {
      element.style[styleName] = value
    }
  }
}

/**
 * 获取 dom 元素的外层滚动容器
 * @param {HTMLElement} el dom元素
 * @param {Boolean} vertical 是否纵向滚动
 * @return {HTMLElement} 滚动容器
 */
export function getScrollContainer(el, vertical) {
  let parent = el
  while (parent) {
    if ([window, document, document.documentElement].includes(parent)) {
      return window
    }
    if (isScroll(parent, vertical)) {
      return parent
    }
    parent = parent.parentNode
  }

  return parent
}

export function isInContainer(el, container) {
  if (!el || !container) {
    return false
  }

  const elRect = el.getBoundingClientRect()
  let containerRect = null

  if (
    [window, document, document.documentElement, null, undefined].includes(
      container
    )
  ) {
    containerRect = {
      top: 0,
      right: window.innerWidth,
      bottom: window.innerHeight,
      left: 0
    }
  } else {
    containerRect = container.getBoundingClientRect()
  }

  return (
    elRect.top < containerRect.bottom &&
    elRect.bottom > containerRect.top &&
    elRect.right > containerRect.left &&
    elRect.left < containerRect.right
  )
}

export function getWindowtWidth() {
  return (
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth
  )
}

export function getWindowHeight() {
  return (
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight
  )
}
