type handler<T = any, R = void> = (...arg: T[]) => R // eslint-disable-line

export const on = (
  element: Element | HTMLElement | Document | Window,
  event: keyof GlobalEventHandlersEventMap,
  handler: handler
) => {
  if (element && event && handler) {
    element.addEventListener(event, handler, false)
  }
}

export const off = (
  element: Element | HTMLElement | Document | Window,
  event: keyof GlobalEventHandlersEventMap,
  handler: handler
) => {
  if (element && event && handler) {
    element.removeEventListener(event, handler, false)
  }
}

type scrollToType = {
  el?: HTMLElement
  to: number
  duration?: number
  endCallback?: () => void
}

export function scrollTo({el, to, duration = 500, endCallback}: scrollToType) {
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (
      window.webkitRequestAnimationFrame ||
      function(callback) {
        return window.setTimeout(callback, 1000 / 60)
      }
    )
  }
  const from = el ? el.scrollTop : window.pageYOffset
  const difference = Math.abs(from - to)
  const step = Math.ceil(difference / duration * 50)

  function scroll(start: number, end: number, step: number) {
    if (start === end) {
      endCallback && endCallback()
      return
    }

    let d = (start + step > end) ? end : start + step
    if (start > end) {
      d = (start - step < end) ? end : start - step
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
