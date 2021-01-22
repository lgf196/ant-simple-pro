import { toRefs, reactive, onMounted } from 'vue'

export default (pro, options = {}) => {
  const { manual = false } = options

  const state = reactive({
    data: null,
    error: false,
    loading: false
  })

  const run = async () => {
    state.error = false
    state.loading = true
    try {
      const result = await pro()
      state.data = result
    } catch (err) {
      console.log('run err', err)
      state.error = true
    }
    state.loading = false
  }

  onMounted(() => {
    !manual && run()
  })

  return {
    run,
    ...toRefs(state)
  }
}
