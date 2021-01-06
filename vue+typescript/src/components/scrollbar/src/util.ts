export interface BarMapItem {
  offset: 'offsetWidth' | 'offsetHeight'
  scroll: 'scrollTop' | 'scrollLeft'
  scrollSize: 'scrollHeight' | 'scrollWidth'
  size: 'height' | 'width'
  key: 'vertical' | 'horizontal'
  axis: 'Y' | 'X'
  client: 'clientX' | 'clientY'
  direction: 'top' | 'left'
}

export interface BarMap {
  vertical: BarMapItem
  horizontal: BarMapItem
}

export interface ScrollbarType {
  wrap: HTMLElement
}

export const BAR_MAP: BarMap = {
  vertical: {
    offset: 'offsetHeight',
    scroll: 'scrollTop',
    scrollSize: 'scrollHeight',
    size: 'height',
    key: 'vertical',
    axis: 'Y',
    client: 'clientY',
    direction: 'top'
  },
  horizontal: {
    offset: 'offsetWidth',
    scroll: 'scrollLeft',
    scrollSize: 'scrollWidth',
    size: 'width',
    key: 'horizontal',
    axis: 'X',
    client: 'clientX',
    direction: 'left'
  }
}

export function renderThumbStyle(size: string, move: number, bar: BarMapItem) {
  const style = {} as CSSStyleDeclaration
  const translate = `translate${bar.axis}(${move}%)`

  style[bar.size] = size
  style.transform = translate
  style.webkitTransform = translate

  return style
}

function extend<T, K>(to: T, _from: K): T & K {
  return Object.assign(to, _from)
}

export function toObject<T>(arr: T[]): Record<string, T> {
  const res = {}
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i])
    }
  }
  return res
}
