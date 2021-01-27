import ResizeObserver from 'resize-observer-polyfill'

export interface ResizeElement extends HTMLElement {
  __resizeListeners__: Array<() => void>
  __ro__: ResizeObserver
}

const resizeHandler = function (entries: ResizeObserverEntry[]) {
  for (const entry of entries) {
    const listeners = (entry.target as ResizeElement).__resizeListeners__ || []
    if (listeners.length) {
      listeners.forEach((fn: () => void) => {
        fn()
      })
    }
  }
}

export const addResizeListener = function (
  element: ResizeElement,
  fn: () => void
) {
  if (!element.__resizeListeners__) {
    element.__resizeListeners__ = []
    element.__ro__ = new ResizeObserver(resizeHandler)
    element.__ro__.observe(element)
  }
  element.__resizeListeners__.push(fn)
}

export const removeResizeListener = function (
  element: ResizeElement,
  fn: () => void
) {
  if (!element || !element.__resizeListeners__) {
    return
  }
  element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1)
  if (!element.__resizeListeners__.length) {
    element.__ro__.disconnect()
  }
}
