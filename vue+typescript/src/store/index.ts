import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

import app, { AppState } from './modules/app'
import user, { UserState } from './modules/user'

import getters from './getters'

export const key: InjectionKey<Store<object>> = Symbol('rootStore')

const store = createStore({
  modules: {
    app,
    user
  },
  getters
})

export type RootState = {
  app: AppState
  user: UserState
}

// define customer `useStore` composition function
export function useStore() {
  return baseUseStore()
}

export default store
