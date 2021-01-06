export const getOption = (): echarts.EChartOption => {
  const data = [
    { name: '家具家电', value: 38 },
    { name: '粮油副食', value: 52 },
    { name: '生鲜水果', value: 61 },
    { name: '美容洗护', value: 145 },
    { name: '母婴用品', value: 48 },
    { name: '进口食品', value: 38 },
    { name: '食品饮料', value: 38 },
    { name: '家庭清洁', value: 45 }
  ]

  const option: echarts.EChartOption = {
    color: ['#6394f9'],
    title: {
      text: '基础柱状图',
      padding: [20, 20],
      textStyle: {
        fontWeight: 400
      }
    },
    xAxis: {
      type: 'category',
      axisLine: {
        lineStyle: {
          color: '#777'
        }
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#8c8c8c'
      },
      data: data.map(v => v.name)
    },
    yAxis: {
      name: '销售额(万)',
      nameLocation: 'center',
      nameRotate: 90,
      nameGap: 40,
      nameTextStyle: {
        color: '#595959'
      },
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
      barWidth: 50
    }],
    animationDuration: 1400
  }
  return option
}
