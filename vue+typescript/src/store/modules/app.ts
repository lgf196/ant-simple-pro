import { VuexModule, getModule, Module, Mutation } from 'vuex-module-decorators'
import { _RouteLocationBase } from 'vue-router'
import store from '@/store'
import {
  getCollapse,
  setCollapse,
  getSideBarTheme,
  setSideBarTheme
} from '@/utils/local'

export type TagItemType = Partial<_RouteLocationBase>
export type ThemeValue = 'dark' | 'light'

@Module({ dynamic: true, namespaced: true, store, name: 'app' })
class App extends VuexModule {
  loading = false

  collapsed: boolean = getCollapse() || false

  sliderTheme: ThemeValue = getSideBarTheme() === 'dark' ? 'dark' : 'light'

  tagsNavVisible = true

  @Mutation
  TOGGLE_SLIDE_BAR(value?: boolean) {
    this.collapsed = typeof value !== 'undefined' ? value : !this.collapsed
    setCollapse(this.collapsed)
  }

  @Mutation
  SET_LOADING(value: boolean) {
    this.loading = value
  }

  @Mutation
  SET_SLIDER_THEME(value: ThemeValue) {
    this.sliderTheme = value
    setSideBarTheme(value)
  }

  @Mutation
  SET_TAGS_NAV_VISIBLE(value: boolean) {
    this.tagsNavVisible = value
  }
}

export default getModule<App>(App)
