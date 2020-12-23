<template>
  <div class="pie">
    <div class="chart" ref="chartRef"></div>
    <ul class="legend-list">
      <li
        class="legend-item"
        :class="{disabled: disabledLegendIndexs.includes(index)}"
        v-for="(item, index) in originalList"
        :key="index"
        @click="onLegendItemClick(index)"
      >
        <div class="round" :style="{backgroundColor: originalColors[index]}"></div>
        <div class="content">
          <span class="name">{{item.name}}</span>
          <span class="percent">{{item.percent}}%</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted, toRefs } from 'vue'
import useChartResize from '@/hooks/useChartResize'
type DataItemType = {
  value: number
  name: string
}
type StateType = {
  disabledLegendIndexs: number[]
  originalColors: string[]
  originalList: Array<DataItemType & {percent?: number}>
}
export default defineComponent({
  setup() {
    const chartRef = ref<HTMLDivElement | null>(null)

    const state = reactive<StateType>({
      disabledLegendIndexs: [],
      originalColors: [],
      originalList: []
    })

    let chart: echarts.ECharts // eslint-disable-line
    let list: DataItemType[] = []
    let colors: string[] = []
    const color = ['#6394f9', '#62daaa', '#657797', '#f6c021', '#e96b5a', '#74caed']
    const chartData = [
      { value: 27, name: '分类一' },
      { value: 25, name: '分类二' },
      { value: 18, name: '分类三' },
      { value: 15, name: '分类四' },
      { value: 10, name: '分类五' },
      { value: 5, name: '其它' }
    ]

    onMounted(() => {
      init() // eslint-disable-line
      initData() // eslint-disable-line
      renderChart() // eslint-disable-line
    })

    function init() {
      if (!chartRef.value) {
        return
      }
      chart = window.echarts.init(chartRef.value)
      useChartResize(chart)
    }

    function initData() {
      state.originalList = chartData.slice() // shallow copy chartData
      const values = state.originalList.map(v => v.value) // map value
      const total = values.reduce((x, y) => x + y, 0) // calc sum
      state.originalList = state.originalList.map(item => {
        const percent = item.value / (total || 1) * 100
        return {
          name: item.name,
          value: item.value,
          percent: Math.round(percent)
        }
      })
      list = chartData.slice() // shallow copy chartData
      // 根据 数据 list 长度 和 prop color，补全不够的 colorItem
      const colorGroup = color
      const groupLen = color.length
      const len = Math.ceil((list.length / groupLen) || 1)
      const flattenColors = [].concat(...Array(len).fill(colorGroup)) // 扁平化
      state.originalColors = flattenColors.slice()
      colors = flattenColors.slice()
    }

    function renderChart() {
      if (!chart) {
        return
      }
      chart.setOption({
        color: colors,
        tooltip: {
          show: true,
          trigger: 'item',
          backgroundColor: 'rgba(255, 255, 255, .7)',
          extraCssText: 'box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);',
          padding: [10, 10],
          textStyle: {
            color: '#3c3c3c',
            fontSize: 12
          },
          formatter(data) {
            const { name, value, marker } = data as echarts.EChartOption.Tooltip.Format
            return `
            <p style="margin-bottom: 8px">${name}</p>
            <div>${marker}
                <span style="margin-left: 28px">${value}</span>
            </div>
          `
          }
        },
        series: [
          {
            type: 'pie',
            radius: ['40%', '60%'],
            avoidLabelOverlap: false,
            hoverAnimation: false,
            label: {
              show: false
            },
            labelLine: {
              show: false
            },
            itemStyle: {
              borderWidth: 1,
              borderColor: '#fff'
            },
            data: list
          }
        ]
      })
    }

    function onLegendItemClick(clickIndex: number) {
      if (state.disabledLegendIndexs.indexOf(clickIndex) >= 0) { // 选中集合中已有，放出当前点击数据
        state.disabledLegendIndexs = state.disabledLegendIndexs.filter(v => v !== clickIndex)
      } else { // 选中集合中没有，排除当前点击数据
        state.disabledLegendIndexs.push(clickIndex)
      }
      // 计算出新的数据后渲染
      list = state.originalList.filter((_, i) => state.disabledLegendIndexs.indexOf(i) < 0)
      colors = state.originalColors.filter((_, i) => state.disabledLegendIndexs.indexOf(i) < 0)
      renderChart()
    }

    return {
      ...toRefs(state),
      chartRef,
      onLegendItemClick
    }
  }
})
</script>

<style lang="less" scoped>
.pie {
  height: 400px;
  display: flex;
}
.chart {
  flex: 1;
  height: 100%;
}
.legend-list {
  flex: 0 0 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.legend-item {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  font-size: 12px;
  cursor: pointer;
  &:last-child {
    margin-bottom: 0;
  }
  &.disabled {
    .round {
      background-color: #999 !important;
    }
    .name, .percent {
      color: #999;
    }
  }
  .round {
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }
  .name {
    margin: 0 5px;
    color: #151d35;
  }
  .percent {
    color: #666;
  }
}
</style>
