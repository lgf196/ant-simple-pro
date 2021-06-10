import { ref, getCurrentInstance } from 'vue'
import { mountComponent } from '@/utils/jsx-helper'
import ImageViewer from './image-viewer.vue'

const defaultProps = {
  urlList: [],
  zIndex: 2000,
  initialIndex: 0
}

let ins = null

function createInstance() {
  const comp = {
    setup() {
      const show = ref(false)
      let attrs = {}
      const open = opts => {
        show.value = true
        attrs = opts
      }

      const close = () => {
        show.value = false
      }

      const toggle = val => {
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
      getCurrentInstance().render = render

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
  ins = createInstance()
  return ins
}

function imagePreview(options) {
  const preview = getInstance()
  preview.open(Object.assign({}, defaultProps, options))
  return preview
}

export { imagePreview }
