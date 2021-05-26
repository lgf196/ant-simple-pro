
import { Shape } from '@antv/x6'
import { portsCircles } from './config'

const { Polygon} = Shape;

export default new Polygon({
  width: 70,
  height: 70,
  attrs: {
    body: {
      stroke: '#31d0c6',
      strokeWidth: 1,
      // 指定 refPoints 属性，多边形顶点随图形大小自动缩放
      // https://x6.antv.vision/zh/docs/api/registry/attr#refpointsresetoffset
      refPoints: '0,10 10,0 20,10 10,20',
    },
  },
  ports: {
    groups: {
      group1: {
        position: { name: 'left' },
        attrs: portsCircles
      },
      group2: {
        position: { name: 'top' },
        attrs:portsCircles
      },
      group3: {
        position: { name: 'right' },
        attrs: portsCircles
      },
      group4: {
        position: { name: 'bottom' },
        attrs:portsCircles
      },
    },
    items: [
      {
        id: 'port11',
        group: 'group1', // 指定分组名称
      },
      {
        id: 'port12',
        group: 'group2', // 指定分组名称
      },
      {
        id: 'port13',
        group: 'group3', // 指定分组名称
      },
      {
        id: 'port14',
        group: 'group4', // 指定分组名称
      },
    ],
  },
})

