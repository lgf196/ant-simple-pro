<template>
  <div class="com-page p20">
    <div class="graphics">
      <div class="sidebar" ref="sliderContainer"></div>
      <div class="content" ref="container"></div>
    </div>
  </div>
</template>

<script lang="ts">
// 简易图形编辑器，一个参考的作用，并不是很完善的，只是提供一个思路
import { defineComponent, ref, onMounted } from 'vue'
import { Graph, Addon } from '@antv/x6'
import { rect, rectangle, cicle, ellipse, polygon } from './shape'
const { Stencil } = Addon

export default defineComponent({
  name: 'GraphicsEditor',
  setup() {
    const sliderContainer = ref<HTMLDivElement>()
    const container = ref<HTMLDivElement>()

    onMounted(() => {
      const graph: Graph = new Graph({
        container: container.value,
        grid: true,
        selecting: {
          enabled: true,
          multiple: true,
          rubberband: true,
          movable: true,
          showNodeSelectionBox: true
        },
        resizing: {
          enabled: true
        },
        snapline: {
          enabled: true,
          sharp: true
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
          router: {
            name: 'manhattan'
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
                      size: '6'
                    }
                  }
                }
              }
            })
          }
        }
      })

      function changePortsVisible(visible: boolean) {
        if (container.value) {
          const ports = container.value.querySelectorAll('.x6-port-body') as NodeListOf<HTMLDivElement>
          for (let i = 0, len = ports.length; i < len; i = i + 1) {
            ports[i].style.visibility = visible ? 'visible' : 'hidden'
          }
        }
      }

      graph.on('cell:mouseenter', ({ cell }) => {
        // 隐藏连接状
        if (cell.isNode()) {
          cell.addTools([
            {
              name: 'boundary',
              args: {
                attrs: {
                  fill: '#7c68fc',
                  stroke: '#333',
                  'stroke-width': 1,
                  'fill-opacity': 0.2
                }
              }
            },
            {
              name: 'button-remove',
              args: {
                x: 5,
                y: 10,
                offset: { x: 10, y: 10 }
              }
            }
          ])
        }
      })

      graph.on('cell:mouseleave', ({ cell }) => {
        cell.removeTools()
      })

      graph.on('node:mouseenter', () => {
        changePortsVisible(true)
      })

      graph.on('node:mouseleave', () => {
        changePortsVisible(false)
      })

      const stencil = new Stencil({
        target: graph,
        stencilGraphWidth: 200,
        stencilGraphHeight: 400,
        groups: [
          {
            name: 'group1',
            title: '基础图形',
            collapsable: false
          }
        ]
      })

      sliderContainer.value!.appendChild(stencil.container) // eslint-disable-line
      stencil.load([rect, rectangle, cicle, ellipse, polygon], 'group1')
    })

    return {
      sliderContainer,
      container
    }
  }
})
</script>

<style lang="less" scoped>
.graphics {
  width: 100%;
  height: 500px;
  display: flex;
}
.sidebar {
  width: 220px;
  border: 1px solid #f0f0f0;
  position: relative;
}
.content {
  height: 100%;
  flex: 1;
  margin-left: 8px;
  margin-right: 8px;
  box-shadow: 0 0 10px 1px #e9e9e9;
}
</style>
