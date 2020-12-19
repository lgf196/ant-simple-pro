import { VuexModule, getModule, Module, Mutation, Action } from 'vuex-module-decorators'
import store from '@/store'
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

export type AccessMenuItem = {
  id: number
  title: string
  icon: string
  url: string
  pid: number
  createTime: number
  children?: AccessMenuItem[]
}

@Module({ dynamic: true, namespaced: true, store, name: 'user' })
class User extends VuexModule {
  currentUser: Record<string, unknown> = getLocalUserInfo() || {}

  accessMenus: AccessMenuItem[] = getLocalAccessMenus() || []

  @Mutation
  SET_USERINFO(data: Record<string, unknown>) {
    this.currentUser = data || {}
    setUserInfo(data)
  }

  @Mutation
  SET_ACCESS_MENUS(data: AccessMenuItem[]) {
    this.accessMenus = data || []
    setAccessMenus(data)
  }

  @Action
  async getUserInfo() {
    const user = await getUserInfo()
    this.SET_USERINFO(user)
  }

  @Action
  async getAccessMenus() {
    const menus = await getAccessMenus()
    this.SET_ACCESS_MENUS(menus)
  }

  @Action
  async getUserData() {
    const [user, menus] = await Promise.all([
      getUserInfo(),
      getAccessMenus()
    ])
    this.SET_USERINFO(user)
    this.SET_ACCESS_MENUS(menus)
  }

  @Action
  async logout() {
    this.SET_USERINFO({})
    this.SET_ACCESS_MENUS([])
    removeUserInfo()
    removeAccessMenus()
    removeToken()
    removeTagNav()
  }
}

export default getModule<User>(User)
