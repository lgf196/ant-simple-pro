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
