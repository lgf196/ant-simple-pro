let NAMESPACE = 'emoji-mart'

const _JSON = JSON

const isLocalStorageSupported = typeof window !== 'undefined' && 'localStorage' in window

let getter = null
let setter = null

function setHandlers(handlers) {
  handlers || (handlers = {})

  getter = handlers.getter
  setter = handlers.setter
}

function setNamespace(namespace) {
  NAMESPACE = namespace
}

function set(key, value) {
  if (setter) {
    setter(key, value)
  } else {
    if (!isLocalStorageSupported) return
    try {
      window.localStorage[`${NAMESPACE}.${key}`] = _JSON.stringify(value)
    } catch (e) {
      console.log('set error', e)
    }
  }
}

function get(key) {
  if (getter) {
    return getter(key)
  }
  if (!isLocalStorageSupported) return
  let value = null
  try {
    value = window.localStorage[`${NAMESPACE}.${key}`]
  } catch (e) {
    console.log('get error', e)
    return
  }

  if (value) {
    return JSON.parse(value)
  }
}

function update(state) {
  for (const key in state) {
    const value = state[key]
    set(key, value)
  }
}

export default { update, set, get, setNamespace, setHandlers }
