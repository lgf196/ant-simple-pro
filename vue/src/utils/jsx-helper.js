import { createApp } from 'vue'
import { isFunc } from '@/utils/type'

/**
 * @description  获取 slot
 */
export function getSlot(slots, slot = 'default', data) {
  if (!slots || !Reflect.has(slots, slot)) {
    return null
  }
  if (!isFunc(slots[slot])) {
    console.error(`${slot} is not a function!`)
    return null
  }
  const slotFn = slots[slot]
  if (!slotFn) {
    return null
  }
  return slotFn(data)
}

/**
 * extends slots
 * @param slots
 * @param excludeKeys
 */
export function extendSlots(slots, excludeKeys) {
  const slotKeys = Object.keys(slots)
  const ret = {}
  slotKeys.map(key => {
    if (excludeKeys.includes(key)) {
      return null
    }
    ret[key] = () => getSlot(slots, key)
  })
  return ret
}

// Get events on attrs
export function getListeners(attrs) {
  const listeners = {}
  Object.keys(attrs).forEach(key => {
    if (/^on/.test(key)) {
      listeners[key] = attrs[key]
    }
  })
  return listeners
}

export function mountComponent(RootComponent, className = '') {
  const app = createApp(RootComponent)
  const root = document.createElement('div')
  root.className = className

  document.body.appendChild(root)

  return {
    instance: app.mount(root),
    unmount() {
      app.unmount(root)
      document.body.removeChild(root)
    }
  }
}
