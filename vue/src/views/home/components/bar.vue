<template>
  <div ref="chartRef" class="chart"></div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import { getOption } from './bar-option'
import { useChartResize } from '@/hooks'

export default defineComponent({
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    const chartRef = ref(null)
    const chartIns = ref(null)
    useChartResize(chartIns)

    onMounted(() => {
      init() // eslint-disable-line
    })

    function init() {
      if (!chartRef.value) {
        return
      }
      const chart = (chartIns.value = window.echarts.init(chartRef.value))
      chart.setOption(getOption(props.list))
    }

    return {
      chartRef
    }
  }
})
</script>

<style lang="less" scoped>
.chart {
  height: 100%;
  background-color: #fff;
}
</style>
