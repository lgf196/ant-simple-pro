/**
 * 全局组件
 */
import { App } from 'vue'
import SvgIcon from '@/components/svg-icon/index.vue'
import ComImage from '@/components/image/index.vue'
// import ImageViewer from '@/components/image/image-viewer'
import UploadImage from '@/components/upload-image/index.vue'
export default function(app: App) {
  app.component('ComSvgIcon', SvgIcon)
  app.component('ComImage', ComImage)
  // app.component('ComImageViewer', ImageViewer)
  app.component('ComUploadImage', UploadImage)
}
