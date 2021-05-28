import { Ref, ref, onMounted, onUnmounted, watch } from 'vue'
import hotkeys, { HotkeysEvent, KeyHandler } from 'hotkeys-js'

type AvailableTags = 'INPUT' | 'TEXTAREA' | 'SELECT'

// We implement our own custom filter system.
hotkeys.filter = () => true

const tagFilter = ({ target }: KeyboardEvent, enableOnTags?: AvailableTags[]) => {
  const targetTagName = target && (target as HTMLElement).tagName

  return Boolean(targetTagName && enableOnTags && enableOnTags.includes(targetTagName as AvailableTags))
}

const isKeyboardEventTriggeredByInput = (ev: KeyboardEvent) => {
  return tagFilter(ev, ['INPUT', 'TEXTAREA', 'SELECT'])
}

export type Options = {
  enabled?: boolean // Main setting that determines if the hotkey is enabled or not. (Default: true)
  filter?: typeof hotkeys.filter // A filter function returning whether the callback should get triggered or not. (Default: undefined)
  filterPreventDefault?: boolean // Prevent default browser behavior if the filter function returns false. (Default: true)
  enableOnTags?: AvailableTags[] // Enable hotkeys on a list of tags. (Default: [])
  enableOnContentEditable?: boolean // Enable hotkeys on tags with contentEditable props. (Default: false)
  splitKey?: string // Character to split keys in hotkeys combinations. (Default +)
  scope?: string // Scope. Currently not doing anything.
  keyup?: boolean // Trigger on keyup event? (Default: undefined)
  keydown?: boolean // Trigger on keydown event? (Default: true)
}

export function useHotkeys<T extends Element>(keys: string, callback: KeyHandler, options?: Options): Ref<T | void>
export function useHotkeys<T extends Element>(keys: string, callback: KeyHandler, deps?: any[]): Ref<T | void>
export function useHotkeys<T extends Element>(
  keys: string,
  callback: KeyHandler,
  options?: Options,
  deps?: any[]
): Ref<T | void>
export function useHotkeys<T extends Element>(
  keys: string,
  callback: KeyHandler,
  options?: any[] | Options,
  deps?: any[]
): Ref<T | void> {
  if (Array.isArray(options)) {
    deps = options || []
    options = undefined
  }
  const elRef = ref<T>()
  const {
    enableOnTags,
    filter,
    keyup,
    keydown,
    filterPreventDefault = true,
    enabled = true,
    enableOnContentEditable = false
  } = options || {}

  function keyHandler(keyboardEvent: KeyboardEvent, hotkeysEvent: HotkeysEvent) {
    if (filter && !filter(keyboardEvent)) {
      return !filterPreventDefault
    }

    // Check whether the hotkeys was triggered inside an input and that input is enabled or if it was triggered by a content editable tag and it is enabled.
    if (
      (isKeyboardEventTriggeredByInput(keyboardEvent) && !tagFilter(keyboardEvent, enableOnTags)) ||
      ((keyboardEvent.target as HTMLElement)?.isContentEditable && !enableOnContentEditable)
    ) {
      return true
    }

    if (!elRef.value || document.activeElement === elRef.value) {
      callback(keyboardEvent, hotkeysEvent)
      return true
    }

    return false
  }

  function setHotKeys() {
    if (!enabled) {
      return
    }

    // In this case keydown is likely undefined, so we set it to false, since hotkeys needs the `keydown` key to have a value.
    if (keyup && keydown !== true) {
      ;(options as Options).keydown = false
    }

    hotkeys(keys, (options as Options) || {}, keyHandler)
  }

  onMounted(() => {
    setHotKeys()
  })

  onUnmounted(() => {
    hotkeys.unbind(keys, keyHandler)
  })

  watch(deps ? deps.map(v => () => v) : [], () => { // eslint-disable-line
    setHotKeys()
  })

  watch([() => options, () => keys, () => enabled], () => {
    setHotKeys()
  })

  return elRef
}
