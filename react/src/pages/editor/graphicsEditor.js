import React, { memo,useRef,useEffect } from 'react'
import PageLayout from '@/layouts/pageLayout'
import { Graph, Addon, Shape } from '@antv/x6'
import style from '@/pages/editor/compent/graphics.module.scss'

/**
 * @description 这个图形编辑器，只是给各位同学们一个参考的作用，并不是很完善的，只是提供一个思路
 */

const { Stencil } = Addon

const { Rect, Circle, Ellipse,Polygon  } = Shape

const GraphicsEditor = memo(function GraphicsEditor(props) {

  const container = useRef(null);

  const sliderContainer = useRef(null);

  useEffect(() => {

    const graph = new Graph({
      container:container.current,
      grid: true,
      selecting: {
        enabled: true,
        multiple: true,
        rubberband: true,
        movable: true,
        showNodeSelectionBox: true,
      },
      resizing: {
        enabled: true,
      },
      snapline: {
        enabled: true,
        sharp: true,
      },
      connecting: {
        snap: true,
        highlight: true,
        connectionPoint: 'anchor',
        allowBlank: true,
        allowMulti: true,
        allowLoop: true,
        allowNode: true,
        allowEdge: true,
        allowPort: true,
        router:{
          name: 'manhattan',
        },
        createEdge() {
          return graph.createEdge({
            attrs: {
              line: {
                strokeDasharray: '5 5',
                stroke: '#808080',
                strokeWidth: 1,
                targetMarker: {
                  name: 'block',
                  args: {
                    size: '6',
                  },
                },
              },
            },
          })
        }
      }
    })

    graph.on('cell:mouseenter', ({ cell }) => {
      if (cell.isNode()) {
        cell.addTools([
          {
            name: 'boundary',
            args: {
              attrs: {
                fill: '#7c68fc',
                stroke: '#333',
                'stroke-width': 1,
                'fill-opacity': 0.2,
              },
            },
          },
          {
            name: 'button-remove',
            args: {
              x: 5,
              y: 10,
              offset: { x: 10, y: 10 },
            },
          },
        ])
      }
    })

    graph.on('cell:mouseleave', ({ cell }) => {
      cell.removeTools()
    })

    const stencil = new Stencil({
      target: graph,
      stencilGraphWidth: 200,
      stencilGraphHeight: 400,
      groups: [
        {
          name: 'group1',
          title: '基础图形',
          collapsable: false,
        }
      ],
    })

    sliderContainer.current.appendChild(stencil.container)

    const portsCircles = {
      circle: {
        r: 6,
        magnet: true,
        stroke: '#31d0c6',
        strokeWidth: 2,
        fill: '#fff',
      },
    };

    const rect = new Rect({
      width: 70,
      height: 40,
      attrs: {
        rect: {  stroke: '#31d0c6', strokeWidth: 1},
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
            id: 'port1',
            group: 'group1', // 指定分组名称
          },
          {
            id: 'port2',
            group: 'group2', // 指定分组名称
          },
          {
            id: 'port3',
            group: 'group3', // 指定分组名称
          },
          {
            id: 'port4',
            group: 'group4', // 指定分组名称
          },
        ],
      },
    })

    const rectangle = new Rect({
      width: 70,
      height: 40,
      attrs: {
        body: {
          strokeWidth: 1,
          stroke: '#31d0c6',
          rx: 10,
          ry: 10,
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
            id: 'port5',
            group: 'group1', // 指定分组名称
          },
          {
            id: 'port6',
            group: 'group2', // 指定分组名称
          },
          {
            id: 'port7',
            group: 'group3', // 指定分组名称
          },
          {
            id: 'port8',
            group: 'group4', // 指定分组名称
          },
        ],
      },
    })

    const cicle = new Circle({
      width: 60,
      height: 60,
      attrs: {
        circle: { stroke: '#31d0c6', strokeWidth: 1},
      },
      ports: {
        groups: {
          group1: {
            position: { name:'ellipse' },
            attrs: portsCircles
          },
        },
        items: [
          {
            id: 'port9',
            group: 'group1', // 指定分组名称
          },
        ],
      },
    })

    const ellipse = new Ellipse({
      width: 70,
      height: 50,
      attrs: {
        ellipse: { stroke: '#31d0c6', strokeWidth: 1},
      },
      ports: {
        groups: {
          group1: {
            position: { name:'ellipse' },
            attrs: portsCircles
          },
        },
        items: [
          {
            id: 'port10',
            group: 'group1', // 指定分组名称
          },
        ],
      },
    })

    const polygon = new Polygon({
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

    stencil.load([rect,rectangle, cicle, ellipse,polygon], 'group1')
  }, [])

  return (
    <PageLayout>
      <div className={style.graphics} >
        <div className={style.sidebar} ref={sliderContainer}></div>
        <div className={style.content} ref={container} ></div>
      </div>
    </PageLayout>
  )
})

export default GraphicsEditor;
