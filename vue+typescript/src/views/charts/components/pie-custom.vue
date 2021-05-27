<template>
  <a-row class="pie" :gutter="[15, 15]">
    <a-col :span="12">
      <div class="chart" ref="chartRef"></div>
    </a-col>
    <a-col :span="12">
      <ul class="legend-list">
        <li
          class="legend-item"
          :class="{ disabled: disabledLegendIndexs.includes(index) }"
          v-for="(item, index) in originalList"
          :key="index"
          @click="onLegendItemClick(index)"
        >
          <div class="round" :style="{ backgroundColor: originalColors[index] }"></div>
          <div class="content">
            <span class="name">{{ item.name }}</span>
            <span class="line"></span>
            <span class="percent">{{ item.percent }}%</span>
            <span>¥ {{ item.percent * 130 }}</span>
          </div>
        </li>
      </ul>
    </a-col>
  </a-row>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted, toRefs } from 'vue'
import { getOption } from './pie-custom-option'
import { useChartResize } from '@/hooks'
type DataItemType = {
  value: number
  name: string
}
type StateType = {
  disabledLegendIndexs: number[]
  originalColors: string[]
  originalList: Array<DataItemType & { percent?: number }>
}
export default defineComponent({
  setup() {
    const chartRef = ref<HTMLDivElement | null>(null)
    const chartIns = ref<echarts.ECharts | null>(null)
    useChartResize(chartIns)

    const state = reactive<StateType>({
      disabledLegendIndexs: [],
      originalColors: [],
      originalList: []
    })

    let chart: echarts.ECharts // eslint-disable-line
    let list: DataItemType[] = []
    let colors: string[] = []
    const color = ['rgb(58, 161, 255)', 'rgb(54, 203, 203)', 'rgb(78, 203, 115)', 'rgb(251, 212, 55)']
    const chartData = [
      { value: 50, name: '销售量' },
      { value: 25, name: '订单量' },
      { value: 20, name: '出厂量' },
      { value: 5, name: '销户量' }
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
      chart = chartIns.value = window.echarts.init(chartRef.value)
    }

    function initData() {
      state.originalList = chartData.slice() // shallow copy chartData
      const values = state.originalList.map(v => v.value) // map value
      const total = values.reduce((x, y) => x + y, 0) // calc sum
      state.originalList = state.originalList.map(item => {
        const percent = (item.value / (total || 1)) * 100
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
      const len = Math.ceil(list.length / groupLen || 1)
      const flattenColors = [].concat(...Array(len).fill(colorGroup)) // 扁平化
      state.originalColors = flattenColors.slice()
      colors = flattenColors.slice()
    }

    function renderChart() {
      if (!chart) {
        return
      }
      chart.setOption(getOption(colors, list))
    }

    function onLegendItemClick(clickIndex: number) {
      if (state.disabledLegendIndexs.indexOf(clickIndex) >= 0) {
        // 选中集合中已有，放出当前点击数据
        state.disabledLegendIndexs = state.disabledLegendIndexs.filter(v => v !== clickIndex)
      } else {
        // 选中集合中没有，排除当前点击数据
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
  width: 100%;
  height: 100%;
  flex: 0 0 120px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.legend-item {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.65);
  &:last-child {
    margin-bottom: 0;
  }
  &.disabled {
    .round {
      background-color: #999 !important;
    }
    .name,
    .percent {
      color: #999;
    }
  }
  .round {
    width: 15px;
    height: 5px;
    margin-right: 10px;
  }
  .name {
    // margin: 0 5px;
    color: #151d35;
  }
  .line {
    position: relative;
    top: 0.18em;
    display: inline-block;
    height: 1.1em;
    margin: 0 8px;
    border-top: 0;
    border-left: 1px solid rgba(0, 0, 0, 0.06);
  }
  .percent {
    display: inline-block;
    width: 100px;
    color: rgba(0, 0, 0, 0.45);
  }
}
</style>
