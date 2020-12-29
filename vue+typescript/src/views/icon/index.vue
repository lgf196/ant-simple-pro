<template>
  <div class="com-page">
    <div class="grid">
      <div v-for="item of svgIconList" :key="item" @click="handleClipboard(generateIconCode(item), $event)">
        <a-tooltip placement="top">
          <template #title>
            {{ generateIconCode(item) }}
          </template>
          <div class="icon-item">
            <ComSvgIcon :name="item" class="disabled" />
            <span>{{ item }}</span>
          </div>
        </a-tooltip>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { message } from 'ant-design-vue'
import svgIcons from './icon'
import { copy } from '@/utils'

export default defineComponent({
  name: 'IconPage',
  setup() {
    const svgIconList = reactive(svgIcons)

    function generateIconCode(symbol: string) {
      return `<SvgIcon name="${symbol}" />`
    }

    function handleClipboard(text: string, event: Event) {
      copy(text, event)
      message.destroy()
      message.success('复制成功')
    }

    return {
      svgIconList,
      generateIconCode,
      handleClipboard
    }
  }
})
</script>

<style lang="less" scoped>
.com-page {
  padding: 20px;
}
.grid {
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
}
.icon-item {
  margin: 20px;
  height: 85px;
  text-align: center;
  width: 100px;
  float: left;
  font-size: 30px;
  color: #24292e;
  cursor: pointer;
}
span {
  display: block;
  font-size: 16px;
  margin-top: 10px;
}
.disabled {
  pointer-events: none;
}
</style>
