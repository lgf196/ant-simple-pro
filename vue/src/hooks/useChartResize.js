import { onMounted, onBeforeUnmount, watch } from 'vue'
import store from '@/store'

export function useChartResize(chartIns) {
  function onResize() {
    chartIns.value && chartIns.value.resize()
  }

  let timer = null

  watch(
    () => store.getters.collapsed,
    () => {
      timer = window.setTimeout(() => {
        onResize()
      }, 500)
    }
  )

  onMounted(() => {
    window.addEventListener('resize', onResize)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', onResize)
    timer && clearTimeout(timer)
  })
}
