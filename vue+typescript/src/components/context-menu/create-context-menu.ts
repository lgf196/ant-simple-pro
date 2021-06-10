import { h, ComponentPublicInstance, ref, getCurrentInstance } from 'vue'
import { omit } from 'lodash'
import { mountComponent } from '@/utils/tsx-helper'
import ContextMenu from './index'
import { ContextMenuProps } from './types'

export type CreateContextMenuProps = ContextMenuProps & {
  event: MouseEvent
}

export type ContextMenuInstance = ComponentPublicInstance<
  {},
  {
    open: (opts: ContextMenuProps) => void
    close: () => void
  }
>

const defaultProps: ContextMenuProps = {
  width: 160,
  menuClass: '',
  position: { x: 0, y: 0 },
  menus: []
}

let ins: ContextMenuInstance | null = null

function createInstance() {
  const comp = {
    setup() {
      const visible = ref(false)

      let attrs: Record<string, unknown> = {}
      const open = (opts: ContextMenuProps) => {
        visible.value = true
        attrs = opts
      }

      const close = () => {
        visible.value = false
      }

      const toggle = (val: boolean) => {
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
      ;(getCurrentInstance() as any).render = render

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
  ins = createInstance() as ContextMenuInstance
  return ins
}

function createContextMenu(options: CreateContextMenuProps) {
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
