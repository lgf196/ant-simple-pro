import { Shape } from '@antv/x6'
import { portsCircles } from './config'

const { Circle } = Shape

export default new Circle({
  width: 60,
  height: 60,
  attrs: {
    circle: { stroke: '#31d0c6', strokeWidth: 1 }
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
        id: 'port9',
        group: 'group1' // 指定分组名称
      }
    ]
  }
})
