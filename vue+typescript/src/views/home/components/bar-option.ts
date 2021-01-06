export const getOption = (
  list: ChartDataItem[]
): echarts.EChartOption => {
  const color = ['#6394f9', '#62daaa', '#657797', '#f6c021', '#7666f9']
  const option: echarts.EChartOption = {
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
      data: list.map(v => v.name)
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
              <span style="margin-left: 28px">${value}%</span>
          </div>
        `
      }
    },
    series: [{
      data: [...list].reverse().map((v, index) => {
        return {
          ...v,
          itemStyle: {
            color: color[index]
          }
        }
      }),
      type: 'bar',
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
