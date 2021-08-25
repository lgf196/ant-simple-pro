import { isDefined } from '@/utils/type'

export const on = (element, event, handler) => {
  if (element && event) {
    element.addEventListener(event, handler, false)
  }
}

export const off = (element, event, handler) => {
  if (element && event) {
    element.removeEventListener(event, handler, false)
  }
}

export function scrollTo({ el, to, duration = 500, endCallback }) {
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame =
      window.webkitRequestAnimationFrame ||
      function (callback) {
        return window.setTimeout(callback, 1000 / 60)
      }
  }
  const from = el ? el.scrollTop : window.pageYOffset
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

    if (!el) {
      window.scrollTo(d, d)
    } else {
      el.scrollTop = d
    }
    window.requestAnimationFrame(() => scroll(d, end, step))
  }
  scroll(from, to, step)
}

const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g // eslint-disable-line
const MOZ_HACK_REGEXP = /^moz([A-Z])/

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
 * 获取 dom 元素样式
 * @param {HTMLElement} element dom元素
 * @param {String} styleName 样式属性名 驼峰形式
 * @return {String} style 样式
 */
export const getStyle = function (element, styleName) {
  if (!element || !styleName) {
    return null
  }
  if (styleName === 'float') {
    styleName = 'cssFloat'
  }
  try {
    const computed = window.getComputedStyle(element, '')
    return element.style[styleName] || computed ? computed[styleName] : null
  } catch (e) {
    return element.style[styleName]
  }
}

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
      ? getStyle(el, 'overflowY')
      : getStyle(el, 'overflowX')
    : getStyle(el, 'overflow')

  return overflow.match(/(scroll|auto)/)
}

/**
 * 设置 dom 元素样式
 * @param {HTMLElement} element dom元素
 * @param {String} styleName 样式属性名
 * @param {String} value 样式属性值
 * @return {void}
 */
export function setStyle(element, styleName, value) {
  if (!element || !styleName || typeof styleName === 'number') {
    return
  }

  if (styleName === 'opacity') {
    element.style.filter = isNaN(value) ? '' : 'alpha(opacity=' + value * 100 + ')'
  } else {
    // @ts-ignore
    element.style[styleName] = value
  }
}

/**
 * 获取 dom 元素的外层滚动容器
 * @param {HTMLElement} el dom元素
 * @param {Boolean} vertical 是否纵向滚动
 * @return {HTMLElement} 滚动容器
 */
export function getScrollContainer(el, vertical = false) {
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

  if ([window, document, document.documentElement, null, undefined].includes(container)) {
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
  return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
}

export function getWindowHeight() {
  return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
}
