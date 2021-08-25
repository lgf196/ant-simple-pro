import { onBeforeUnmount, ref, watch } from 'vue'
// import store from '@/store'

export function useEcharts(chartDOM, option) {
  const chartInstance = ref(null)

  watch(chartDOM, () => {
    renderChart() // eslint-disable-line
  })

  watch(option, () => {
    renderChart() // eslint-disable-line
  })

  onBeforeUnmount(() => {
    chartInstance.value && chartInstance.value.dispose()
  })

  function renderChart() {
    if (!chartDOM.value) {
      return
    }
    const renderedInstance = window.echarts.getInstanceByDom(chartDOM.value)
    if (renderedInstance) {
      chartInstance.value = renderedInstance
    } else {
      chartInstance.value = window.echarts.init(chartDOM.value)
    }
    if (!option.value) {
      return
    }
    chartInstance.value.setOption(option.value)
  }

  // let timer: number | null = null

  // watch(() => store.getters.collapsed, () => {
  //   timer = window.setTimeout(() => {
  //     onResize()
  //   }, 500)
  // })

  // onMounted(() => {
  //   window.addEventListener('resize', onResize)
  // })

  // onBeforeUnmount(() => {
  //   window.removeEventListener('resize', onResize)
  //   timer && clearTimeout(timer)
  // })

  // function onResize() {
  //   chartInstance && chartInstance.resize()
  // }

  return {
    chartInstance,
    renderChart
  }
}
