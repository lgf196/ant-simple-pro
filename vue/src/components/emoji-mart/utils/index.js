import stringFromCodePoint from '../polyfills/stringFromCodePoint'

function unifiedToNative(unified) {
  const unicodes = unified.split('-')
  const codePoints = unicodes.map(u => `0x${u}`)
  return stringFromCodePoint(...codePoints)
}

function uniq(arr) {
  return arr.reduce((acc, item) => {
    if (acc.indexOf(item) === -1) {
      acc.push(item)
    }
    return acc
  }, [])
}

function intersect(a, b) {
  const uniqA = uniq(a)
  const uniqB = uniq(b)

  return uniqA.filter(item => uniqB.indexOf(item) >= 0)
}

function deepMerge(a, b) {
  const o = {}

  for (const key in a) {
    const originalValue = a[key]
    let value = originalValue

    if (Object.prototype.hasOwnProperty.call(b, key)) {
      value = b[key]
    }

    if (typeof value === 'object') {
      value = deepMerge(originalValue, value)
    }

    o[key] = value
  }

  return o
}

// https://github.com/sonicdoe/measure-scrollbar
function measureScrollbar() {
  if (typeof document === 'undefined') return 0
  const div = document.createElement('div')

  div.style.width = '100px'
  div.style.height = '100px'
  div.style.overflow = 'scroll'
  div.style.position = 'absolute'
  div.style.top = '-9999px'

  document.body.appendChild(div)
  const scrollbarWidth = div.offsetWidth - div.clientWidth
  document.body.removeChild(div)

  return scrollbarWidth
}

export { uniq, intersect, deepMerge, unifiedToNative, measureScrollbar }
