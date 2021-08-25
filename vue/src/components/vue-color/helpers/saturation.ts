import { CalculateChangeProps } from '../types'

export const calculateChange = (e: MouseEvent | TouchEvent, props: CalculateChangeProps, container: HTMLElement) => {
  e.preventDefault()
  const { width: containerWidth, height: containerHeight } = container.getBoundingClientRect()
  const x = (e as MouseEvent).pageX || (e as TouchEvent).touches[0].pageX
  const y = (e as MouseEvent).pageY || (e as TouchEvent).touches[0].pageY
  let left = x - (container.getBoundingClientRect().left + window.pageXOffset)
  let top = y - (container.getBoundingClientRect().top + window.pageYOffset)

  if (left < 0) {
    left = 0
  } else if (left > containerWidth) {
    left = containerWidth
  } else if (top < 0) {
    top = 0
  } else if (top > containerHeight) {
    top = containerHeight
  }

  const saturation = (left * 100) / containerWidth
  const bright = -((top * 100) / containerHeight) + 100

  return {
    h: props.hsl.h,
    s: saturation,
    v: bright,
    a: props.hsl.a,
    source: 'rgb'
  }
}
