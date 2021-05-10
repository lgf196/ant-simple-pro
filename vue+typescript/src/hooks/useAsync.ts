import { toRefs, reactive, onMounted } from 'vue'

type Service<R = any, P extends any[] = any[]> = (...args: P) => Promise<R>

type OptionsType = {
  /** 是否手动调用 */
  manual?: boolean
  /** 初始化数据 */
  initialData?: any
  /** 成功回调 */
  onSuccess?: () => void
  /** 失败回调 */
  onError?: (e: Error | null) => void
  /** 其他属性 */
  [propName: string]: any
}

type StateType<D> = {
  data: D
  loading: boolean
  error: Error | null
}

/**
 * useAsync
 * @param  {Promise} pro 异步操作
 * @param  {Object} options 参数
 * @param  {Boolean} [options.manual=false] 是否手动调用
 * @param  {Any} options.initialData 初始化数据
 * @param  {Function} options.onSuccess 成功回调
 * @param  {Function} options.onError 失败回调
 */

export default function <T = any>(pro: Service<T>, options: OptionsType = {}) {
  const {
    manual = false,
    initialData,
    onSuccess = () => {}, // eslint-disable-line
    onError = console.log
  } = options

  const state: StateType<T> = reactive({
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
  function mutate(data: T) {
    state.data = data
  }
  return {
    ...toRefs(state),
    run,
    mutate
  }
}
