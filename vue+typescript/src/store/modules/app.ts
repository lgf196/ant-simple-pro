import { VuexModule, getModule, Module, Mutation } from 'vuex-module-decorators'
import { _RouteLocationBase } from 'vue-router'
import store from '@/store'
import { getCollapse, setCollapse } from '@/utils/local'
import { getAffixTags } from '@/utils'
import { routes } from '@/router/routes'

export type TagItemType = Partial<_RouteLocationBase>

@Module({ dynamic: true, namespaced: true, store, name: 'app' })
class App extends VuexModule {
  loading = false

  collapsed: boolean = getCollapse() || false

  affixTags: TagItemType[] = getAffixTags(routes) || []

  tagNavList: TagItemType[] = []

  get totalTags() {
    return this.affixTags.concat(this.tagNavList)
  }

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
  ADD_TAG(item: TagItemType) {
    const currentIndex = this.tagNavList.findIndex(v => v.path === item.path)
    console.log('ADD_TAG currentIndex', currentIndex)
    if (currentIndex < 0) {
      this.tagNavList = this.tagNavList.concat(item)
    }
  }
}

export default getModule<App>(App)
