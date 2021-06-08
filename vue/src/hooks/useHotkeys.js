import { ref, onMounted, onUnmounted, watch } from 'vue'
import hotkeys from 'hotkeys-js'

// We implement our own custom filter system.
hotkeys.filter = () => true

const tagFilter = ({ target }, enableOnTags) => {
  const targetTagName = target && target.tagName

  return Boolean(targetTagName && enableOnTags && enableOnTags.includes(targetTagName))
}

const isKeyboardEventTriggeredByInput = ev => {
  return tagFilter(ev, ['INPUT', 'TEXTAREA', 'SELECT'])
}

export function useHotkeys(keys, callback, options, deps) {
  if (Array.isArray(options)) {
    deps = options || []
    options = undefined
  }
  const elRef = ref()
  const {
    enableOnTags,
    filter,
    keyup,
    keydown,
    filterPreventDefault = true,
    enabled = true,
    enableOnContentEditable = false
  } = options || {}

  function keyHandler(keyboardEvent, hotkeysEvent) {
    if (filter && !filter(keyboardEvent)) {
      return !filterPreventDefault
    }

    // Check whether the hotkeys was triggered inside an input and that input is enabled or if it was triggered by a content editable tag and it is enabled.
    if (
      (isKeyboardEventTriggeredByInput(keyboardEvent) && !tagFilter(keyboardEvent, enableOnTags)) ||
      (keyboardEvent.target?.isContentEditable && !enableOnContentEditable)
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
      options.keydown = false
    }

    hotkeys(keys, options || {}, keyHandler)
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
