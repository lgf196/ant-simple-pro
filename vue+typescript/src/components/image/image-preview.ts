import { h, createApp, App } from 'vue'
import ImageViewer from './image-viewer.vue'

export type ImageViewerPropsType = {
  urlList: string[]
  zIndex?: number
  onSwitch?: (val: boolean) => void
  destroy: () => void
  initialIndex?: number
}

let app: App | null = null

type OptionsType = Omit<ImageViewerPropsType, 'destroy'>

const defaultOptions = {
  urlList: []
}

export default function (options: OptionsType = defaultOptions) {
  const div = document.createElement('div')
  document.body.appendChild(div)
  const destroy = () => {
    app && app.unmount(div)
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
