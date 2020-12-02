/**
 * 全局组件
 */
import SvgIcon from '@/components/svg-icon'
import ComImage from '@/components/image'
import ImageViewer from '@/components/image/image-viewer'
import UploadImage from '@/components/upload-image'
export default function(app) {
  app.component('ComSvgIcon', SvgIcon)
  app.component('ComImage', ComImage)
  app.component('ComImageViewer', ImageViewer)
  app.component('ComUploadImage', UploadImage)
}
