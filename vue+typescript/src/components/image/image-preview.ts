import { h, createApp, ComponentPublicInstance } from 'vue'
import ImageViewer from './image-viewer.vue'

export type ImageViewerPropsType = {
  urlList: string[]
  zIndex?: number
  onSwitch?: (val: boolean) => void
  destroy: () => void
  initialIndex?: number
}

export type ImageViewerInstance = {
  open(): void
  close(): void
  destroy(): void
}

// let app: App | null = null

type OptionsType = Omit<ImageViewerPropsType, 'destroy'>

const defaultOptions = {
  urlList: []
}

let instance: ImageViewerInstance | null = null

function newInstance(options: OptionsType, callback: (ins: ImageViewerInstance) => void) {
  const div = document.createElement('div')
  div.className = 'image-preview-wrapper-root'
  document.body.appendChild(div)
  const app = createApp({
    mounted(this: ComponentPublicInstance) {
      const self = this // eslint-disable-line
      this.$nextTick(() => {
        callback({ // eslint-disable-line
          open() {
            ;(self.$refs as any).imageViewer.visible = true
          },
          close() {
            ;(self.$refs as any).imageViewer.visible = false
          },
          destroy() {
            app && app.unmount(div)
            if (div.parentNode) {
              div.parentNode.removeChild(div)
            }
          }
        })
      })
    },
    render() {
      const props = {
        ...options,
        ref: 'imageViewer'
      }
      return h(ImageViewer, props)
    }
  })
  app.mount(div)
}

function getInstance(options: OptionsType, callback: (ins: ImageViewerInstance) => void) {
  if (instance) {
    callback(instance)
    return
  }
  newInstance(options, ins => {
    instance = ins
    callback(ins)
  })
}

export default function imagePreview(options: OptionsType = defaultOptions) {
  getInstance(options, ins => {
    ins.open()
  })
}

// export default function (options: OptionsType = defaultOptions) {
//   const div = document.createElement('div')
//   document.body.appendChild(div)
//   const destroy = () => {
//     app && app.unmount(div)
//     if (div.parentNode) {
//       div.parentNode.removeChild(div)
//     }
//   }
//   const props = {
//     ...options,
//     destroy,
//     ref: 'imageViewer'
//   }
//   app = createApp({
//     render() {
//       return h(ImageViewer, props)
//     }
//   })
//   app.mount(div)
//   return destroy
// }
