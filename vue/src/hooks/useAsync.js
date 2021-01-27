import { toRefs, reactive, onMounted } from 'vue'

/**
 * useAsync
 * @param  {Promise} pro 异步操作
 * @param  {Object} options 参数
 * @param  {Boolean} [options.manual=false] 是否手动调用
 * @param  {Any} options.initialData 初始 data
 * @param  {Function} options.onSuccess 成功回调
 * @param  {Function} options.onError 失败回调
 */

export default (pro, options = {}) => {
  const {
    manual = false,
    initialData,
    onSuccess = () => {}, // eslint-disable-line
    onError = () => {} // eslint-disable-line
  } = options

  const state = reactive({
    data: initialData || null,
    error: false,
    loading: false
  })

  const run = async () => {
    state.error = false
    state.loading = true
    try {
      const result = await pro()
      state.data = result
      onSuccess()
    } catch (err) {
      console.log('run err', err)
      onError()
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
