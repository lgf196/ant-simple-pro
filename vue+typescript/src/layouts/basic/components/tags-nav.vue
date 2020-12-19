<template>
  <div class="tags-nav">
    <ScrollPane :horizontalBar="false" :verticalBar="false" ref="scrollPane">
      <div
        v-for="(item, index) in totalTags"
        :key="index"
        class="nav-tag"
        :class="{active: isActive(item)}"
        :ref="setItemRef"
        :data-route-path="item.path"
        @click="onClickTag(item)"
      >
        <span class="nav-tag__title">{{item.meta && item.meta.title}}</span>
        <CloseOutlined v-if="!isAffix(item)" class="nav-tag__icon" @click.stop="onDeleteTag(item)" />
      </div>
    </ScrollPane>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, unref, watch, computed, nextTick, toRefs } from 'vue'
import { RouteRecordRaw, useRoute, RouteLocationNormalizedLoaded, _RouteLocationBase } from 'vue-router'
import { CloseOutlined } from '@ant-design/icons-vue'
import ScrollPane, { ScrollActionType } from '@/components/scrollbar/scroll-pane.vue'
import { routes } from '@/router/routes'
import { getAffixTags } from '@/utils'

export type TagItemType = Partial<_RouteLocationBase>
type StateType = {
  tags: TagItemType[]
}
export default defineComponent({
  name: 'TagsNav',
  components: {
    ScrollPane,
    CloseOutlined
  },
  setup() {
    const scrollPane = ref<ScrollActionType | null>(null)
    const tagRefs = ref<HTMLElement[]>([])
    const state = reactive<StateType>({
      tags: []
    })
    const route = useRoute()
    watch(route, (newRoute) => {
      addTag(newRoute) // eslint-disable-line
      moveToView(newRoute) // eslint-disable-line
    }, {
      immediate: true
    })
    const totalTags = computed(() => {
      return [...getAffixTags(routes), ...state.tags]
    })
    function setItemRef(el: HTMLElement) {
      tagRefs.value.push(el)
    }
    function isActive(item: TagItemType) {
      return item.path === route.path
    }
    function isAffix(item: TagItemType) {
      return item.meta && item.meta.affix
    }
    function onDeleteTag(item: TagItemType) {
      console.log('onDeleteTag', item)
    }
    function onClickTag(item: RouteRecordRaw) {
      console.log('onClickTag', item)
      // const scroll = unref(scrollPane) as ScrollActionType
      // unref(tagRefs).forEach((item, index) => {
      //   if (item && index === 99) {
      //     // route.path === item.dataset['route-path']
      //     scroll.moveToTarget(item, unref(tagRefs))
      //   }
      // })
    }

    function addTag(item: TagItemType) {
      if (!item.meta) {
        return
      }
      if (!item.meta.title) {
        return
      }
      if (item.meta.affix) {
        return
      }
      const hasCurrent = state.tags.some(v => v.path === item.path)
      if (!hasCurrent) {
        state.tags = state.tags.concat(item)
      }
      // if (currentIndex >= 0) { // 存在替换
      //   state.tags.splice(currentIndex, 1, item)
      //   state.tags = state.tags.map((v, index) => {
      //     if (index === currentIndex) {
      //       return item
      //     }
      //     return v
      //   })
      // } else { // 不存在添加
      //   // state.tags.push(item)
      //   state.tags = state.tags.concat(item)
      // }
    }

    // 移动到可视范围
    function moveToView(route: RouteLocationNormalizedLoaded) {
      nextTick(() => {
        const scroll = unref(scrollPane) as ScrollActionType
        for (let i = 0; i < unref(tagRefs).length; i++) {
          const item = unref(tagRefs)[i]
          // 找出 tagRefs 中 对应当前路由的 tag
          if (item && item.dataset['route-path'] === route.path) {
            scroll.moveToTarget(item, unref(tagRefs))
            break
          }
        }
      })
    }
    return {
      ...toRefs(state),
      totalTags,
      scrollPane,
      setItemRef,
      isActive,
      isAffix,
      onDeleteTag,
      onClickTag
    }
  }
})
</script>

<style lang="less" scoped>
  .tags-nav {
    position: relative;
    height: @tags-nav-header;
    display: flex;
    align-items: center;
    background-color: #fff;
    border-top: 1px solid #f0f0f0;
    border-bottom: 1px solid #f0f0f0;
  }
  .item {
    display: inline-block;
    position: relative;
    cursor: pointer;
    height: 26px;
    line-height: 26px;
    border: 1px solid #d8dce5;
    color: #495060;
    background: #fff;
    padding: 0 8px;
    font-size: 12px;
    margin-left: 5px;
  }
  .nav-tag {
    display: inline-block;
    height: 26px;
    line-height: 26px;
    margin-top: 4px;
    margin-left: 5px;
    background: #fff;
    border: 1px solid #e9eaec;
    border-radius: 3px;
    cursor: pointer;
    font-size: 12px;
    color: #666;
    font-weight: 400;
    vertical-align: middle;
    &.active {
      background: #e6f7ff;
      color: #1890ff;
    }
    .nav-tag__title {
      float: left;
      white-space: nowrap;
      padding: 0 5px;
    }
    .nav-tag__icon {
      padding: 0 5px 0 0;
    }
  }
</style>
