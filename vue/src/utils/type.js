/**
 * 检查变量类型
 */
const toString = Object.prototype.toString

function createCheckTypeFn(type) {
  return function isType(value) {
    return toString.call(value) === `[object ${type}]`
  }
}

export const isFunc = createCheckTypeFn('Function')
export const isUndefined = createCheckTypeFn('Undefined')
export const isArray = createCheckTypeFn('Array')
export const isString = createCheckTypeFn('String')
export const isObject = createCheckTypeFn('Object')
export const isNumber = createCheckTypeFn('Number')
export const isDate = createCheckTypeFn('Date')

export function isHtmlElement(node) {
  return node && node.nodeType === Node.ELEMENT_NODE
}

export function isDefined(val) {
  return val !== undefined && val !== null
}
