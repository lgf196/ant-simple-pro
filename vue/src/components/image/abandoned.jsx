/**
 * 废弃
 */
import { h, createApp } from 'vue'
import ImageViewer from './image-viewer.vue'

const defaultOptions = {
  urlList: []
}

let instance = null

function newInstance(options, callback) {
  const div = document.createElement('div')
  div.className = 'image-preview-wrapper-root'
  document.body.appendChild(div)
  const app = createApp({
    mounted() {
      const self = this // eslint-disable-line
      this.$nextTick(() => {
        callback({
          // eslint-disable-line
          open() {
            self.$refs.imageViewer.visible = true
          },
          close() {
            self.$refs.imageViewer.visible = false
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

function getInstance(options, callback) {
  if (instance) {
    callback(instance)
    return
  }
  newInstance(options, ins => {
    instance = ins
    callback(ins)
  })
}

export default function imagePreview(options = defaultOptions) {
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
