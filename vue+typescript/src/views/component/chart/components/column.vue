<template>
  <div class="chart" ref="chartRef"></div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import useChartResize from '@/hooks/useChartResize'
export default defineComponent({
  setup() {
    const chartRef = ref<HTMLDivElement | null>(null)
    const data = [
      { year: '1991', value: 3 },
      { year: '1992', value: 4 },
      { year: '1993', value: 3.5 },
      { year: '1994', value: 5 },
      { year: '1995', value: 4.9 },
      { year: '1996', value: 6 },
      { year: '1997', value: 7 },
      { year: '1998', value: 9 },
      { year: '1999', value: 13 }
    ]

    onMounted(() => {
      init() // eslint-disable-line
    })

    function init() {
      if (!chartRef.value) {
        return
      }
      const chart = window.echarts.init(chartRef.value)
      useChartResize(chart)
      chart.setOption({
        color: ['#6394f9'],
        xAxis: {
          type: 'category',
          data: data.map(v => v.year)
        },
        yAxis: {
          type: 'value',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#666'
          },
          splitLine: {
            lineStyle: {
              color: '#ddd'
            }
          }
        },
        tooltip: {
          show: true,
          trigger: 'axis',
          backgroundColor: 'rgba(255, 255, 255, .7)',
          extraCssText: 'box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);',
          padding: [10, 10],
          textStyle: {
            color: '#3c3c3c',
            fontSize: 12
          },
          formatter(data) {
            const [d] = data as echarts.EChartOption.Tooltip.Format[]
            const { name, value, marker } = d
            return `
              <p style="margin-bottom: 8px">${name}</p>
              <div>${marker}
                  <span style="margin-left: 28px">${value}</span>
              </div>
            `
          }
        },
        series: [{
          data: data.map(v => v.value),
          type: 'line',
          symbolSize: 10,
          label: {
            show: true,
            color: '#3c3c3c'
          }
        }]
      })
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
