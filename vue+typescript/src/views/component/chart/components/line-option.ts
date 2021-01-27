export const getOption = (): echarts.EChartOption => {
  const data = [
    { name: '1991', value: 3 },
    { name: '1992', value: 4 },
    { name: '1993', value: 3.5 },
    { name: '1994', value: 5 },
    { name: '1995', value: 4.9 },
    { name: '1996', value: 6 },
    { name: '1997', value: 7 },
    { name: '1998', value: 9 },
    { name: '1999', value: 13 }
  ]

  const option: echarts.EChartOption = {
    color: ['#6394f9'],
    grid: {
      top: '20%'
    },
    title: {
      text: '配置折线数据点样式',
      subtext: '自定义配置趋势线上数据点的样式',
      padding: [20, 20],
      textStyle: {
        fontWeight: 400
      },
      subtextStyle: {
        color: '#808080'
      }
    },
    xAxis: {
      type: 'category',
      data: data.map(v => v.name)
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
    series: [
      {
        data: data.map(v => v.value),
        type: 'line',
        symbolSize: 10,
        label: {
          show: true,
          color: '#3c3c3c'
        }
      }
    ],
    animationDuration: 1400
  }
  return option
}
