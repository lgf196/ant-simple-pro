import { getUserInfo, getAccessMenus } from '@/api/global'
import {
  getUserInfo as getLocalUserInfo,
  setUserInfo,
  removeUserInfo,
  removeToken,
  removeTagNav,
  setAccessMenus,
  getAccessMenus as getLocalAccessMenus,
  removeAccessMenus
} from '@/utils/local'

export default {
  namespaced: true,

  state: {
    currentUser: getLocalUserInfo() || {},
    accessMenus: getLocalAccessMenus() || []
  },

  mutations: {
    SET_USERINFO(state, data) {
      state.currentUser = data || {}
      setUserInfo(data)
    },
    SET_ACCESS_MENUS(state, data) {
      state.accessMenus = data || []
      setAccessMenus(data)
    }
  },
  actions: {
    async getUserInfo({ commit }) {
      const user = await getUserInfo()
      commit('SET_USERINFO', user)
    },
    async getAccessMenus({ commit }) {
      const menus = await getAccessMenus()
      commit('SET_ACCESS_MENUS', menus)
    },
    async getUserData({ commit }) {
      const [user, menus] = await Promise.all([getUserInfo(), getAccessMenus()])
      commit('SET_ACCESS_MENUS', menus)
      commit('SET_USERINFO', user)
    },
    // GetInfo({ commit }) {
    //   return new Promise((resolve, reject) => {
    //     getInfo()
    //       .then(response => {
    //         const resourceList = response.resources.map(v => v.code)
    //         if (resourceList.length) {
    //           commit('SET_USERINFO', response)
    //           commit('SET_RESOURCE_LIST', resourceList)
    //           resolve()
    //         } else {
    //           reject(new Error('resources must be a non-null array !'))
    //         }
    //       })
    //       .catch(err => {
    //         console.log(err)
    //         reject(err)
    //       })
    //   })
    // },
    logout({ commit }) {
      return new Promise(resolve => {
        commit('SET_USERINFO', {})
        removeUserInfo()
        // commit('SET_RESOURCE_LIST', [])
        commit('SET_ACCESS_MENUS', [])
        removeAccessMenus()
        removeToken()
        removeTagNav()
        resolve()
      })
    }
  }
}
