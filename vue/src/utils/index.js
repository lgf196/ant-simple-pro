import { saveAs } from 'file-saver'
import Clipboard from 'clipboard'

/**
 * 生成随机字符串
 * @return {String} 字符串
 */
export const getRandomStr = () => {
  return new Date().getTime() + Math.random().toString(16).slice(2)
}

/**
 * 获取固定显示的 tags
 * @param {Array<RouteRecordRaw>} routes 路由表
 * @return {Array<TagItemType>} 固定的
 */
export const getAffixTags = (routes = []) => {
  let result = []
  routes.forEach(item => {
    if (item.path && item.path !== '/:pathMatch(.*)*' && item.meta && item.meta.affix) {
      result.push(item)
    }
    if (Array.isArray(item.children)) {
      result = result.concat(getAffixTags(item.children))
    }
  })
  return result
}
export function rafThrottle(fn) {
  let locked = false
  return function (...args) {
    if (locked) return
    locked = true
    window.requestAnimationFrame(() => {
      fn.apply(this, args)
      locked = false
    })
  }
}

export function downloadExcel(data, filename) {
  const buf = Buffer.from(data, 'binary')
  const b = new Blob([buf], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  })
  saveAs(b, filename)
}

export const copy = (text, event) => {
  const el = event.target
  const clipboard = new Clipboard(el, {
    text: () => text
  })
  clipboard.on('success', () => {
    clipboard.destroy()
  })
  clipboard.on('error', err => {
    console.log(err)
    clipboard.destroy()
  })
  clipboard.onClick(event)
}
