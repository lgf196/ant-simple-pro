import dayjs from 'dayjs'

/**
 * 格式化日期
 * @param {dayjs.ConfigType} date 日期
 * @return {String} YYYY-MM-DD 日期
 */
export const formatDate = (date: dayjs.ConfigType) => {
  return dayjs(date).format('YYYY-MM-DD')
}

/**
 * 格式化时间
 * @param {dayjs.ConfigType} date 时间
 * @return {String} YYYY-MM-DD HH:mm:ss 时间
 */
export const formatDateTime = (date: dayjs.ConfigType) => {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
}

/**
 * 获取上月开始和结束时间
 * @return {Object} {start, end} 时间
 */
export function getPrevMonthDays() {
  const startDate = new Date()
  startDate.setMonth(startDate.getMonth() - 1)
  const start = dayjs(startDate).date(1).format('YYYY-MM-DD') // 上月第一天
  const endDate = new Date()
  const end = dayjs(endDate).date(0).format('YYYY-MM-DD') // 上月最后一天（本月第一天的前一天）
  return { start, end }
}
