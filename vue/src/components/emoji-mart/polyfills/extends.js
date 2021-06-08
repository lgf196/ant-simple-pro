const _Object = Object

export default _Object.assign ||
  function (target, ...rest) {
    for (let i = 1; i < rest.length; i++) {
      const source = rest[i]

      for (const key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key]
        }
      }
    }

    return target
  }
