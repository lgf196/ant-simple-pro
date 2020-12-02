import { ref, onBeforeUnmount } from 'vue'
import store from '@/store'
import { routes } from '@/router/routes'
import { getAccessRoutes, getAccessMenus } from '@/utils'

export default function useMenus(cb) {
  const menus = ref([])
  const unsubscribe = store.subscribe((mutation, state) => {
    if (mutation.type === 'user/SET_RESOURCE_LIST') {
      const accessRoutes = getAccessRoutes(routes, state.user.resourceList)
      const accessMenus = getAccessMenus(accessRoutes)
      menus.value = accessMenus
      cb && cb(accessMenus)
    }
  })
  onBeforeUnmount(() => {
    unsubscribe()
  })
  return {
    menus
  }
}
