<template>
  <div ref="container" class="p10"></div>
</template>

<script>
import { Chart } from '@antv/g2'
export default {
  mounted() {
    const data = [
      {
        type: '家具家电',
        sales: 38
      },
      {
        type: '粮油副食',
        sales: 52
      },
      {
        type: '生鲜水果',
        sales: 61
      },
      {
        type: '美容洗护',
        sales: 145
      },
      {
        type: '母婴用品',
        sales: 48
      },
      {
        type: '进口食品',
        sales: 38
      },
      {
        type: '食品饮料',
        sales: 38
      },
      {
        type: '家庭清洁',
        sales: 38
      }
    ]
    const chart = new Chart({
      container: this.$refs.container,
      autoFit: true,
      height: 400,
      appendPadding: [20, 20, 20, 20]
    })

    chart.data(data)
    chart.scale('sales', {
      nice: true,
      alias: '销售量'
    })
    chart.scale('type', {
      alias: '类别'
    })

    chart.axis('sales', {
      title: {
        offset: 50,
        style: {
          opacity: 0.8
        }
      }
    })

    chart.axis('type', {
      title: {
        offset: 50,
        style: {
          opacity: 0.8
        }
      },
      line: {
        style: {
          color: '#000000'
        }
      },
      tickLine: null
    })

    chart.tooltip({
      showMarkers: true
    })
    chart.interaction('active-region')

    chart.interval().position('type*sales')

    chart.render()
  }
}
</script>
