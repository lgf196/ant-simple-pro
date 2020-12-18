import { RouteRecordRaw, _RouteLocationBase } from 'vue-router'

export type TagItemType = Partial<_RouteLocationBase>
/**
 * 获取固定显示的 tags
 * @param {Array<RouteRecordRaw>} routes 路由表
 * @return {Array<TagItemType>} 固定的
 */
export const getAffixTags = (routes: RouteRecordRaw[]) => {
  let result: TagItemType[] = []
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
