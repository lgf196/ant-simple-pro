export const getOption = (list: ChartDataItem[]): echarts.EChartOption => {
  const option: echarts.EChartOption = {
    color: ['#6394f9', '#62daaa', '#657797', '#f6c021', '#7666f9'],
    legend: {
      bottom: 20,
      itemWidth: 10,
      data: list.map(v => {
        return {
          name: v.name,
          icon: 'circle'
        }
      })
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
            <span style="margin-left: 28px">${value}%</span>
        </div>
      `
      }
    },
    series: [
      {
        type: 'pie',
        radius: '70%',
        avoidLabelOverlap: false,
        hoverAnimation: false,
        label: {
          show: true,
          position: 'outside'
        },
        labelLine: {
          show: true,
          length2: 0
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
