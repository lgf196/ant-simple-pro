import { onMounted, onBeforeUnmount, reactive, toRefs } from 'vue'
import { throttle } from 'lodash'
import { getWindowtWidth, getWindowHeight } from '@/utils/dom'

export function useResizeWidth(fn: () => void = () => {}) { // eslint-disable-line
  const state = reactive({
    width: getWindowtWidth(),
    height: getWindowHeight()
  })

  function onResize() {
    state.width = getWindowtWidth()
    state.height = getWindowHeight()
    fn()
  }

  const onResizeThrottled = throttle(onResize, 300)

  onMounted(() => {
    window.addEventListener('resize', onResizeThrottled)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', onResizeThrottled)
  })

  return {
    ...toRefs(state)
  }
}
