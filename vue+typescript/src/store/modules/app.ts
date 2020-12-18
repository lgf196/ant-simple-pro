import { Module } from 'vuex'
import { getCollapse, setCollapse } from '@/utils/local'
import { RootState } from '../index'
import { RouteLocationNormalizedLoaded } from 'vue-router'

export type AppState = {
  loading: boolean
  collapsed: boolean
  tagNavList: RouteLocationNormalizedLoaded[]
}

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
    SET_LOADING(state, value: boolean) {
      state.loading = value
    }
  }
} as Module<AppState, RootState>
