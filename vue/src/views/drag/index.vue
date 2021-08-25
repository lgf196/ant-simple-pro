<template>
  <div class="com-page p20">
    <p class="mt10 mb10 text-align-center">
      实现一个简单的可视化页面生成器(简易版本，大致的架子，要想开发完整的，请自行在这基础上继续延伸)
    </p>
    <a-row class="main-container" type="flex">
      <div class="drag-container">
        <Draggable
          v-model:modelValue="dragList"
          :group="{ name: 'comps', pull: 'clone', put: false }"
          :sort="false"
          item-key="icon"
          @start="onStart"
          @end="onEnd"
        >
          <template #item="{ element }">
            <div class="drag-item" :data-type="element.type">
              <ComSvgIcon :name="element.icon"></ComSvgIcon>
              <p>{{ element.title }}</p>
            </div>
          </template>
        </Draggable>
      </div>
      <div ref="gridContainer" class="grid-container" @dragenter="allowDrop" @dragover="allowDrop">
        <GridLayout
          v-if="layout.length"
          ref="gridLayout"
          v-model:layout="layout"
          :col-num="12"
          :row-height="30"
          :is-draggable="true"
          :is-resizable="true"
          :is-mirrored="false"
          :vertical-compact="true"
          :margin="[10, 10]"
          :use-css-transforms="true"
        >
          <GridItem
            v-for="item in layout"
            :ref="setItemRef"
            :key="item.i"
            :x="item.x"
            :y="item.y"
            :w="item.w"
            :h="item.h"
            :i="item.i"
          >
            <component :is="item.type" :data-i="item.i" @contextmenu="e => onComponentClick(e, item)"></component>
          </GridItem>
        </GridLayout>
        <a-empty
          v-else
          style="height: 100%; padding-top: 200px"
          image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
          :image-style="{
            height: '60px'
          }"
        >
          <template #description>
            <span>暂无数据，快添加组件到画布来吧</span>
          </template>
        </a-empty>
      </div>
    </a-row>
  </div>
</template>

<script>
// https://github.com/jbaysolutions/vue-grid-layout/
// https://www.npmjs.com/package/vue-draggable-next
// https://github.com/dattn/dnd-grid

import { defineComponent, onBeforeUnmount, ref } from 'vue'
import { GridLayout, GridItem } from '@/components/grid-layout'
import Draggable from 'vuedraggable'
import { maxBy } from 'lodash'
import { createContextMenu } from '@/components/context-menu/create-context-menu'
// import { getRandomStr } from '@/utils'
import templates, { TempBanner, TempList, TempNews } from './templates'

const mouseXY = {
  x: 0,
  y: 0
}

let index = 0
export default defineComponent({
  components: {
    Draggable,
    GridLayout,
    GridItem,
    TempBanner,
    TempList,
    TempNews
  },
  setup() {
    const dragList = ref(templates)
    const gridList = ref([])
    const currentItem = ref()
    const layout = ref([])

    const gridLayout = ref()
    const gridContainer = ref()
    const gridItems = ref([])

    onBeforeUnmount(() => {
      mouseXY.x = 0
      mouseXY.y = 0
    })

    function onStart(e) {
      mouseXY.x = e.clientX
      mouseXY.y = e.clientY
      currentItem.value = templates.find(v => v.type === e.item.dataset.type)
    }

    function onEnd() {
      if (!gridContainer.value) {
        return
      }
      const rect = gridContainer.value.getBoundingClientRect()
      let mouseInGrid = false
      if (mouseXY.x > rect.left && mouseXY.x < rect.right && mouseXY.y > rect.top && mouseXY.y < rect.bottom) {
        mouseInGrid = true
      }
      if (mouseInGrid) {
        const len = layout.value.length
        const averageWidth = Math.ceil(gridContainer.value.clientWidth / 12)
        const colWidth = gridLayout.value?.$refs.gridItem.calcColWidth()
        let w = 1
        let h = 1
        if (currentItem.value) {
          w = currentItem.value.w / (colWidth || averageWidth)
          h = currentItem.value.h / 35 // default: rowHeight = 35
        }
        const max = maxBy(layout.value, v => v.y)
        index += 1
        console.log({
          x: 0,
          y: max ? max.y + h : len + 12,
          w,
          h,
          i: String(index),
          type: currentItem.value?.type
        })
        layout.value.push({
          x: 0,
          y: max ? max.y + h : len + 12,
          w,
          h,
          i: String(index),
          type: currentItem.value?.type
        })
      }
    }

    function allowDrop(e) {
      // 浏览器默认禁止了接受拖拽对象，禁用默认行为，使当前容器可以接收拖拽对象
      e.preventDefault()
      mouseXY.x = e.clientX
      mouseXY.y = e.clientY
    }

    function setItemRef(el) {
      if (el) {
        gridItems.value.push(el)
      }
    }

    function onComponentClick(e, item) {
      const id = item.i
      console.log('id', id)
      createContextMenu({
        event: e,
        menus: [
          {
            label: '复制',
            handler() {
              const max = maxBy(layout.value, v => v.y)
              console.log(max ? max.y + item.h : layout.value.length + 12)
              index += 1
              layout.value.push({
                x: item.x + item.w,
                y: max ? max.y + item.h : layout.value.length + 12,
                w: item.w,
                h: item.h,
                type: item.type,
                i: String(index)
              })
            }
          },
          {
            label: '删除',
            handler() {
              const idx = layout.value.findIndex(v => v.i === id)
              layout.value.splice(idx, 1)
            }
          },
          {
            label: '清除画布',
            handler() {
              layout.value = []
            }
          }
        ]
      })
    }

    return {
      dragList,
      gridList,
      gridContainer,
      gridLayout,
      layout,
      onStart,
      onEnd,
      allowDrop,
      setItemRef,
      onComponentClick
    }
  }
})
</script>

<style lang="less" scoped>
.main-container {
  min-height: 600px;
}

.drag-container {
  width: 180px;
  flex: 0 0 180px;
  padding-right: 10px;
  border-right: 1px solid #f0f0f0;
}

.grid-container {
  position: relative;
  flex: 1;
  margin-left: 20px;
  box-shadow: 0 0 10px 1px #e9e9e9;
  background: #fff;
}

.drag-item {
  padding: 10px;
  margin: 10px;
  background: #f5f8fb;
  border-radius: 5px;
  color: #393e46;
  text-align: center;
  cursor: move;

  &:hover {
    border: 2px solid #06c;
  }

  ::v-deep(.svg-icon) {
    font-size: 18px;
  }
}

.grid-container ::v-deep(.vue-grid-placeholder) {
  background-color: pink;
}

.grid-container ::v-deep(.vue-grid-item) {
  padding: 10px;
  overflow: hidden;

  &:hover {
    border: 2px solid #06c;
  }
}
</style>
