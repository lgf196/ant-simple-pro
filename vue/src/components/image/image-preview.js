import { defineComponent, nextTick, createApp } from 'vue'
import ImageViewer from './image-viewer'

let instance = null

export default {
  open(options = {}) {
    if (!instance) {
      const c = defineComponent({
        extends: ImageViewer,
        data: () => options
      })
      console.log(c)
      instance = createApp(c)
    }
    if (instance.visible) return
    instance.urlList = Array.isArray(options) ? options : options.urlList || []
    // document.body.appendChild(instance.$el)
    instance.mount(document.createElement('div'))
    console.log(instance)

    nextTick(() => {
      instance.visible = true
    })
  },

  close() {
    if (instance) {
      instance.visible = false
    }
  }
}
