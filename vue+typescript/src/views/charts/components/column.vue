<template>
  <div ref="chartRef" class="chart"></div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { getOption } from './column-option'
import { useChartResize } from '@/hooks'

export default defineComponent({
  setup() {
    const chartRef = ref<HTMLDivElement | null>(null)
    const chartIns = ref<echarts.ECharts | null>(null)
    useChartResize(chartIns)

    onMounted(() => {
      init() // eslint-disable-line
    })

    function init() {
      if (!chartRef.value) {
        return
      }
      const chart = (chartIns.value = window.echarts.init(chartRef.value))
      chart.setOption(getOption())
    }

    return {
      chartRef
    }
  }
})
</script>

<style lang="less" scoped>
.chart {
  height: 400px;
}
</style>
