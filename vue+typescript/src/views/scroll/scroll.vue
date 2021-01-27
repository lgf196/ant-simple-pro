<template>
  <div>
    <div class="scroll-wrap">
      <ScrollPane ref="scrollPane">
        <ul>
          <li
            v-for="(item, index) in 600"
            :key="index"
            :style="{ border: '1px solid #eee' }"
          >
            {{ item }}
          </li>
        </ul>
      </ScrollPane>
    </div>
    <a-button @click="onClick">update</a-button>
    <a-button @click="onBottom">bottom</a-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, unref } from 'vue'
import ScrollPane, { ScrollActionType } from './scroll-pane.vue'
export default defineComponent({
  components: {
    ScrollPane
  },
  setup() {
    const scrollPane = ref<ScrollActionType | null>(null)
    function onClick() {
      const scroll = unref(scrollPane) as ScrollActionType
      scroll.scrollTo(100)
    }
    function onBottom() {
      const scroll = unref(scrollPane) as ScrollActionType
      scroll.scrollBottom()
    }
    return {
      scrollPane,
      onClick,
      onBottom
    }
  }
})
</script>

<style lang="less" scoped>
.scroll-wrap {
  width: 300px;
  height: 320px;
  background-color: #fff;
}
</style>
