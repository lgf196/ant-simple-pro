import { h, ref, getCurrentInstance } from 'vue'
import { omit } from 'lodash'
import { mountComponent } from '@/utils/jsx-helper'
import ContextMenu from './index'

const defaultProps = {
  width: 160,
  menuClass: '',
  position: { x: 0, y: 0 },
  menus: []
}

let ins = null

function createInstance() {
  const comp = {
    setup() {
      const visible = ref(false)

      let attrs = {}
      const open = opts => {
        visible.value = true
        attrs = opts
      }

      const close = () => {
        visible.value = false
      }

      const toggle = val => {
        visible.value = val
      }

      const render = () => {
        attrs = {
          ...attrs,
          visible: visible.value,
          'onUpdate:visible': toggle
        }

        return h(ContextMenu, attrs)
      }

      // rewrite render function
      getCurrentInstance().render = render

      return {
        open,
        close
      }
    }
  }
  const { instance } = mountComponent(comp, 'context-menu-wrapper-root')

  return instance
}

function getInstance() {
  if (ins) {
    return ins
  }
  ins = createInstance()
  return ins
}

function createContextMenu(options) {
  const { event } = options
  event.preventDefault()
  const props = Object.assign({}, defaultProps, omit(options, ['event']), {
    position: {
      x: event.clientX,
      y: event.clientY
    }
  })
  const mInstance = getInstance()
  mInstance.close()
  setTimeout(() => {
    mInstance.open(props)
  }, 20)
  return mInstance
}

export { createContextMenu }
