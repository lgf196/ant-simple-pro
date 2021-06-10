/**
 * 废弃
 */
import { h, createApp, ComponentPublicInstance } from 'vue'
import { omit } from 'lodash'
import ContextMenu from './index'
import { CreateContextOptions, ContextMenuProps, Position } from './types'

export type ContextMenuInstance = {
  open(): void
  close(): void
  destroy(): void
}

let position: Position = {
  x: 0,
  y: 0
}

// const defaultProps = {
//   width: 160,
//   menuClass: '',
//   postion: { x: 0, y: 0 },
//   menus: [] as ContextMenuItem[]
// }

let instance: ContextMenuInstance | null = null

function newInstance(options: ContextMenuProps, callback: (ins: ContextMenuInstance) => void) {
  const div = document.createElement('div')
  div.className = 'context-menu-wrapper-root'
  document.body.appendChild(div)
  const app = createApp({
    data() {
      return {
        appProps: {
          ...options,
          ref: 'contextMenu'
        }
      }
    },
    mounted(this: ComponentPublicInstance) {
      const self = this // eslint-disable-line
      callback({ // eslint-disable-line
        open() {
          ;(self as any).appProps.position = position
          ;(self.$refs as any).contextMenu.sVisible = false
          setTimeout(() => {
            ;(self.$refs as any).contextMenu.sVisible = true
          }, 20)
        },
        close() {
          ;(self.$refs as any).contextMenu.sVisible = false
        },
        destroy() {
          app && app.unmount(div)
          if (div.parentNode) {
            div.parentNode.removeChild(div)
          }
        }
      })
      // this.$nextTick(() => {
      // })
    },
    render() {
      // const props = {
      //   ...options,
      //   ref: 'contextMenu'
      // }
      return h(ContextMenu, this.appProps)
    }
  })
  app.mount(div)
}

function getInstance(options: ContextMenuProps, callback: (ins: ContextMenuInstance) => void) {
  if (instance) {
    callback(instance)
    return
  }
  newInstance(options, ins => {
    instance = ins
    callback(ins)
  })
}

export default function createContextMenu(options: CreateContextOptions) {
  const { event } = options
  event.preventDefault()
  const props = Object.assign({}, omit(options, ['event']), {
    position: {
      x: event.clientX,
      y: event.clientY
    }
  })
  getInstance(props, ins => {
    position = {
      x: event.clientX,
      y: event.clientY
    }
    ins.open()
  })
}
