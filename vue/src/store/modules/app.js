import { getCollapse, setCollapse, getSideBarTheme, setSideBarTheme } from '@/utils/local'

export default {
  namespaced: true,

  state: {
    loading: false,
    collapsed: getCollapse() || false,
    sliderTheme: getSideBarTheme() === 'dark' ? 'dark' : 'light',
    tagsNavVisible: true
  },

  mutations: {
    TOGGLE_SLIDE_BAR(state, value) {
      state.collapsed = typeof value !== 'undefined' ? value : !state.collapsed
      setCollapse(state.collapsed)
    },
    SET_LOADING(state, value) {
      state.loading = value
    },
    SET_SLIDER_THEME(state, value) {
      state.sliderTheme = value
      setSideBarTheme(value)
    },
    SET_TAGS_NAV_VISIBLE(state, value) {
      state.tagsNavVisible = value
    }
  }
}
