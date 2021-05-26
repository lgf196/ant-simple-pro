import { onBeforeUnmount, ref, Ref, watch } from 'vue'
import echarts from 'echarts'
// import appStore from '@/store/modules/app'

export function useEcharts(
  chartDOM: Ref<HTMLDivElement | null>,
  option: Ref<echarts.EChartOption | echarts.EChartsResponsiveOption | null>
) {
  const chartInstance = ref<echarts.ECharts | null>(null)

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

  // watch(() => appStore.collapsed, () => {
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
