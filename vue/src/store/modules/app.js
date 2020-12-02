import { getCollapse, setCollapse } from '@/utils/local'

export default {
  namespaced: true,

  state: {
    loading: false,
    collapsed: getCollapse() || false,
    tagNavList: []
  },

  mutations: {
    TOGGLE_SLIDE_BAR(state, value) {
      state.collapsed = typeof value !== 'undefined' ? value : !state.collapsed
      setCollapse(state.collapsed)
    },
    SET_LOADING(state, value) {
      state.loading = value
    }
  }
}
