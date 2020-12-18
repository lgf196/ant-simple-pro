import { Module, ActionContext } from 'vuex'
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
import { RootState } from '../index'

export type AccessMenuItem = {
  id: number
  title: string
  icon: string
  url: string
  pid: number
  createTime: number
  children?: AccessMenuItem[]
}
export type UserState = {
  currentUser: object
  accessMenus: AccessMenuItem[]
}
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
    async GetUserInfo({ commit }) {
      const user = await getUserInfo()
      commit('SET_USERINFO', user)
    },
    async GetAccessMenus({ commit }) {
      const menus = await getAccessMenus()
      commit('SET_ACCESS_MENUS', menus)
    },
    async GetUserData({ commit }: ActionContext<UserState, RootState>) {
      const [user, menus] = await Promise.all([
        getUserInfo(),
        getAccessMenus()
      ])
      commit('SET_ACCESS_MENUS', menus)
      commit('SET_USERINFO', user)
    },
    Logout({ commit }: ActionContext<UserState, RootState>) {
      return new Promise((resolve) => {
        commit('SET_USERINFO', {})
        removeUserInfo()
        commit('SET_ACCESS_MENUS', [])
        removeAccessMenus()
        removeToken()
        removeTagNav()
        resolve()
      })
    }
  }
} as Module<UserState, RootState>
