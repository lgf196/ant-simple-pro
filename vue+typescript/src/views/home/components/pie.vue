<template>
  <div class="chart" ref="chartRef"></div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, onMounted } from 'vue'
import { getOption } from './pie-option'
import useChartResize from '@/hooks/useChartResize'

export default defineComponent({
  props: {
    list: {
      type: Array as PropType<ChartDataItem[]>,
      default: () => []
    }
  },
  setup(props) {
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
