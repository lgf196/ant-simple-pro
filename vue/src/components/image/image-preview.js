import { createApp } from 'vue'
import ImageViewer from './image-viewer'

let app = null

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
      return <ImageViewer {...props} />
    }
  })
  app.mount(div)
  return destroy
}
