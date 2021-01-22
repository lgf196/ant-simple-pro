import { onMounted, onBeforeUnmount, watch } from 'vue'
import store from '@/store'

export default function (chartIns) {
  function onResize() {
    chartIns.value && chartIns.value.resize()
  }

  let timer = null

  watch(
    () => store.getters.collapsed,
    () => {
      timer = setTimeout(() => {
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
