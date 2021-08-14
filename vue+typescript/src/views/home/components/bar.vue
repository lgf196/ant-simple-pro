<template>
  <div ref="chartRef" class="chart"></div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, onMounted } from 'vue'
import { getOption } from './bar-option'
import { ChartDataItem } from '@/types/common'
import { useChartResize } from '@/hooks'
import echarts from 'echarts'

export default defineComponent({
  props: {
    list: {
      type: Array as PropType<ChartDataItem[]>,
      default: () => []
    }
  },
  setup(props) {
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
