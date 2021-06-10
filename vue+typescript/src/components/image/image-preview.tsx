import { ComponentPublicInstance, ref, getCurrentInstance } from 'vue'
import { mountComponent } from '@/utils/tsx-helper'
import ImageViewer from './image-viewer.vue'

export type ImageViewerPropsType = {
  urlList: string[]
  zIndex?: number
  onSwitch?: (val: boolean) => void
  initialIndex?: number
}

export type ImageViewerInstance = ComponentPublicInstance<
  {},
  {
    open: (opts: ImageViewerPropsType) => void
  }
>

const defaultProps: ImageViewerPropsType = {
  urlList: [],
  zIndex: 2000,
  initialIndex: 0
}

let ins: ImageViewerInstance | null = null

function createInstance() {
  const comp = {
    setup() {
      const show = ref(false)
      let attrs: Record<string, unknown> = {}
      const open = (opts: ImageViewerPropsType) => {
        show.value = true
        attrs = opts
      }

      const close = () => {
        show.value = false
      }

      const toggle = (val: boolean) => {
        show.value = val
      }

      const render = () => {
        attrs = {
          ...attrs,
          show: show.value,
          'onUpdate:show': toggle
        }

        return <ImageViewer {...attrs} />
      }

      // rewrite render function
      ;(getCurrentInstance() as any).render = render

      return {
        open,
        close
      }
    }
  }
  const { instance } = mountComponent(comp, 'image-preview-wrapper-root')

  return instance
}

function getInstance() {
  if (ins) {
    return ins
  }
  ins = createInstance() as ImageViewerInstance
  return ins
}

function imagePreview(options: ImageViewerPropsType) {
  const preview = getInstance()
  preview.open(Object.assign({}, defaultProps, options))
  return preview
}

export { imagePreview }
