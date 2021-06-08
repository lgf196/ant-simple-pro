export const calculateChange = (e, props, container) => {
  e.preventDefault()
  const { width: containerWidth, height: containerHeight } = container.getBoundingClientRect()
  const x = e.pageX || e.touches[0].pageX
  const y = e.pageY || e.touches[0].pageY
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
