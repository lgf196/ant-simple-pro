import { createStore, useStore as baseUseStore } from 'vuex'

const store = createStore({})

// define customer `useStore` composition function
export function useStore() {
  return baseUseStore()
}

export default store
