/**
 * 全局方法
 */
import { App } from 'vue'
import { formatDate, formatDateTime } from '@/utils/date'

export default function(app: App) {
  const g = app.config.globalProperties

  g.$formatDate = formatDate
  g.$formatDateTime = formatDateTime
}
