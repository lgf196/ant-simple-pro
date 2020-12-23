import { onMounted, onBeforeUnmount, watch } from 'vue'
import echarts from 'echarts'
import appStore from '@/store/modules/app'

export default function (chart: echarts.ECharts) {
  function onResize() {
    chart.resize()
  }

  let timer: number | null = null

  watch(() => appStore.collapsed, () => {
    timer = window.setTimeout(() => {
      onResize()
    }, 500)
  })

  onMounted(() => {
    window.addEventListener('resize', onResize)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', onResize)
    timer && clearTimeout(timer)
  })
}
