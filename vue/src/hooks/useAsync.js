import { toRefs, reactive, onMounted } from 'vue'

/**
 * useAsync
 * @param  {Promise} pro 异步操作
 * @param  {Object} options 参数
 * @param  {Boolean} [options.manual=false] 是否手动调用
 * @param  {Any} options.initialData 初始化数据
 * @param  {Function} options.onSuccess 成功回调
 * @param  {Function} options.onError 失败回调
 */

export function useAsync(pro, options = {}) {
  const {
    manual = false,
    initialData,
    onSuccess = () => {}, // eslint-disable-line
    onError = console.log
  } = options

  const state = reactive({
    data: initialData || null,
    error: null,
    loading: false
  })

  const run = async () => {
    state.error = null
    state.loading = true
    try {
      const result = await pro()
      state.data = result
      onSuccess()
    } catch (err) {
      onError(err)
      state.error = err
    }
    state.loading = false
  }

  onMounted(() => {
    !manual && run()
  })

  // 从外部主动改变数据
  function mutate(data) {
    state.data = data
  }
  return {
    ...toRefs(state),
    run,
    mutate
  }
}
