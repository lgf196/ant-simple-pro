<template>
  <div class="chart" ref="chartRef"></div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { getOption } from './column-option'
import useChartResize from '@/hooks/useChartResize'

export default defineComponent({
  setup() {
    const chartRef = ref<HTMLDivElement | null>(null)

    onMounted(() => {
      init() // eslint-disable-line
    })

    function init() {
      if (!chartRef.value) {
        return
      }
      const chart = window.echarts.init(chartRef.value)
      useChartResize(chart)
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
