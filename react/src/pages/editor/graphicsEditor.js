import React, { memo, useRef, useEffect } from 'react';
import PageLayout from '@/layouts/pageLayout';
import { Graph, Addon } from '@antv/x6';
import style from '@/pages/editor/compent/graphics.module.scss';
import { rect, rectangle, cicle, ellipse, polygon } from './shape';

/**
 * @description 这个图形编辑器，只是给各位同学们一个参考的作用，并不是很完善的，只是提供一个思路
 */

const { Stencil } = Addon;

const GraphicsEditor = memo(function GraphicsEditor() {
  const container = useRef(null);

  const sliderContainer = useRef(null);

  useEffect(() => {
    const graph = new Graph({
      container: container.current,
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
        router: {
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
          });
        },
      },
    });

    const changePortsVisible = (visible) => {
      const ports = container.current.querySelectorAll('.x6-port-body');
      for (let i = 0, len = ports.length; i < len; i = i + 1) {
        ports[i].style.visibility = visible ? 'visible' : 'hidden';
      }
    };

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
        ]);
      }
    });

    graph.on('cell:mouseleave', ({ cell }) => {
      cell.removeTools();
    });

    graph.on('node:mouseenter', () => {
      changePortsVisible(true);
    });

    graph.on('node:mouseleave', () => {
      changePortsVisible(false);
    });

    const stencil = new Stencil({
      target: graph,
      stencilGraphWidth: 200,
      stencilGraphHeight: 400,
      groups: [
        {
          name: 'group1',
          title: '基础图形',
          collapsable: false,
        },
      ],
    });

    sliderContainer.current.appendChild(stencil.container);

    stencil.load([rect, rectangle, cicle, ellipse, polygon], 'group1');
  }, []);

  return (
    <PageLayout>
      <p style={{ textAlign: 'center', padding: '10px 0' }}>
        实现一个简单的可视化页面生成器
        <code>
          (简易版本，大致的架子，要想开发完整的，请查看这个项目
          <a href="https://github.com/lgf196/ant-simple-draw">
            ant-simple-draw
          </a>
          )
        </code>
      </p>
      <div className={style.graphics}>
        <div className={style.sidebar} ref={sliderContainer}></div>
        <div className={style.content} ref={container}></div>
      </div>
    </PageLayout>
  );
});

export default GraphicsEditor;
