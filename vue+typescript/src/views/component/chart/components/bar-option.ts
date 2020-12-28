export const getOption = (): echarts.EChartOption => {
  const data = [
    { name: '西北', value: 82 },
    { name: '西南', value: 130 },
    { name: '华北', value: 245 },
    { name: '东北', value: 268 },
    { name: '中南', value: 414 },
    { name: '华东', value: 468 }
  ]

  const option: echarts.EChartOption = {
    color: ['#6394f9'],
    title: {
      text: '基础条形图',
      padding: [20, 20],
      textStyle: {
        fontWeight: 400
      }
    },
    xAxis: {
      type: 'value',
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        show: false
      },
      splitLine: {
        show: false
      },
      name: '销售额',
      nameLocation: 'center',
      nameTextStyle: {
        color: '#595959'
      }
    },
    yAxis: {
      type: 'category',
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#8c8c8c'
      },
      splitLine: {
        show: false
      },
      data: data.map(v => v.name)
    },
    tooltip: {
      show: true,
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
        shadowStyle: {
          color: 'rgba(24, 144, 255, .05)'
        }
      },
      backgroundColor: 'rgba(255, 255, 255, .9)',
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
              <span>销售额(万):</span>
              <span style="margin-left: 28px">${value}</span>
          </div>
        `
      }
    },
    series: [{
      data: data.map(v => v.value),
      type: 'bar',
      barWidth: 25,
      label: {
        show: true,
        position: 'insideLeft',
        padding: [0, 0, 0, 8],
        formatter(data: {value: number}) {
          return data.value + '万'
        }
      }
    }],
    animationDuration: 1400
  }
  return option
}
