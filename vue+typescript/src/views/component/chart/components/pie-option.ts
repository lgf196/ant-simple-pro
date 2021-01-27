export const getOption = (
  colors: string[],
  list: {
    value: number
    name: string
  }[]
): echarts.EChartOption => {
  const option: echarts.EChartOption = {
    color: colors,
    title: {
      text: '环图',
      subtext: '环图的外半径决定环图的大小，而内半径决定环图的厚度',
      padding: [20, 20],
      textStyle: {
        fontWeight: 400
      },
      subtextStyle: {
        color: '#808080'
      }
    },
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
        const {
          name,
          value,
          marker
        } = data as echarts.EChartOption.Tooltip.Format
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
    ],
    animationDuration: 1400
  }
  return option
}
