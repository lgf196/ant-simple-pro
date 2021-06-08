import { Shape } from '@antv/x6'
import { portsCircles } from './config'

const { Rect } = Shape

export default new Rect({
  width: 70,
  height: 40,
  attrs: {
    rect: { stroke: '#31d0c6', strokeWidth: 1 }
  },
  ports: {
    groups: {
      group1: {
        position: { name: 'left' },
        attrs: portsCircles
      },
      group2: {
        position: { name: 'top' },
        attrs: portsCircles
      },
      group3: {
        position: { name: 'right' },
        attrs: portsCircles
      },
      group4: {
        position: { name: 'bottom' },
        attrs: portsCircles
      }
    },
    items: [
      {
        id: 'port1',
        group: 'group1' // 指定分组名称
      },
      {
        id: 'port2',
        group: 'group2' // 指定分组名称
      },
      {
        id: 'port3',
        group: 'group3' // 指定分组名称
      },
      {
        id: 'port4',
        group: 'group4' // 指定分组名称
      }
    ]
  }
})
