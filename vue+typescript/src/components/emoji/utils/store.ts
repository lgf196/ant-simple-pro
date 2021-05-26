let NAMESPACE = 'emoji-mart'

const isLocalStorageSupported =
  typeof window !== 'undefined' && 'localStorage' in window

export interface StoreHandlers {
  getter?(key: string): any
  setter?(key: string, value: any): void
}

let getter: null | StoreHandlers['getter'] = null
let setter: null | StoreHandlers['setter'] = null

function setHandlers(handlers?: StoreHandlers) {
  if (handlers) {
    getter = handlers.getter
    setter = handlers.setter
  }
}

function setNamespace(namespace: string) {
  NAMESPACE = namespace
}

function update(state: Record<string, any>) {
  for (const key in state) {
    const value = state[key]
    set(key, value)
  }
}

function set(key: string, value: any) {
  if (setter) {
    setter(key, value)
  } else {
    if (!isLocalStorageSupported) {
      return
    }
    try {
      window.localStorage[`${NAMESPACE}.${key}`] = JSON.stringify(value)
    } catch (e) {
      console.log(e)
    }
  }
}

function get(key: string) {
  if (getter) {
    return getter(key)
  }
  if (!isLocalStorageSupported) {
    return
  }
  try {
    const value = window.localStorage[`${NAMESPACE}.${key}`]

    if (value) {
      return JSON.parse(value)
    }
  } catch (e) {
    console.log(e)
  }
}

export default { update, set, get, setNamespace, setHandlers }
