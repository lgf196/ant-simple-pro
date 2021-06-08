/**
 * 全局方法
 */
import { formatDate, formatDateTime } from '@/utils/date'

export default function (app) {
  const g = app.config.globalProperties

  g.$formatDate = formatDate
  g.$formatDateTime = formatDateTime
}
