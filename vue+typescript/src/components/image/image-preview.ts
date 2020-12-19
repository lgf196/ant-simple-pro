import { h, createApp, App } from 'vue'
import ImageViewer from './image-viewer.vue'

let app: App

export default function(options = {}) {
  const div = document.createElement('div')
  document.body.appendChild(div)
  const destroy = () => {
    app.unmount(div)
    if (div.parentNode) {
      div.parentNode.removeChild(div)
    }
  }
  const props = {
    ...options,
    destroy
  }
  app = createApp({
    render() {
      return h(ImageViewer, props)
    }
  })
  app.mount(div)
  return destroy
}
