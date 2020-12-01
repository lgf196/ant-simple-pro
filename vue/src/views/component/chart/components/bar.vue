<template>
  <div
    ref="container"
    class="p10"
  ></div>
</template>

<script>
import { Chart } from '@antv/g2'
export default {
  mounted() {
    const data = [
      { type: '西北', value: 82 },
      { type: '西南', value: 130 },
      { type: '华北', value: 245 },
      { type: '东北', value: 268 },
      { type: '中南', value: 414 },
      { type: '华东', value: 458 }
    ]
    const chart = new Chart({
      container: this.$refs.container,
      autoFit: true,
      height: 400,
      appendPadding: [20, 20, 20, 20]
    })
    chart.data(data)
    chart.scale({
      value: {
        alias: '销量额'
      }
    })
    chart.axis('type', {
      title: null,
      tickLine: null,
      line: null,
      subTickLine: null
    })

    chart.axis('value', {
      label: null,
      tickLine: null,
      subTickLine: null,
      line: null,
      title: {
        offset: 30,
        style: {
          fontSize: 12,
          fontWeight: 300
        }
      }
    })
    chart.legend(false)
    chart.tooltip({
      showMarkers: false
    })
    chart.coordinate().transpose()
    chart
      .interval()
      .position('type*value')
      .size(26)
      .label('value', v => {
        return {
          style: {
            fill: '#fff'
          },
          position: 'middle',
          content: v + '万'
        }
      })
    chart.interaction('active-region')
    chart.render()
  }
}
</script>
