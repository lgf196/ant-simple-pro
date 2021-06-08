import { Shape } from '@antv/x6'
import { portsCircles } from './config'

const { Ellipse } = Shape

export default new Ellipse({
  width: 70,
  height: 50,
  attrs: {
    ellipse: { stroke: '#31d0c6', strokeWidth: 1 }
  },
  ports: {
    groups: {
      group1: {
        position: { name: 'ellipse' },
        attrs: portsCircles
      }
    },
    items: [
      {
        id: 'port10',
        group: 'group1' // 指定分组名称
      }
    ]
  }
})
