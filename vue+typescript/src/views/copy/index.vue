<template>
  <div class="com-page p20">
    <a-textarea class="textarea" v-model:value="txt" :rows="2"></a-textarea>
    <a-button type="primary" @click="onClick">复制</a-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { message } from 'ant-design-vue'
import { copy } from '@/utils'
export default defineComponent({
  setup() {
    const txt = ref(
      'Ant Simple Pro，简洁，美观，快速上手，组件丰富新的ui，简洁大方，支持vue3.0,ts+vue3.0,angular,react,react+ts,三大框架，5分钟快速搭建一个项目，简单上手快'
    )
    function onClick(event: MouseEvent) {
      copy(txt.value, event)
      message.destroy()
      message.success('复制成功，ctrl+v进行粘贴')
    }
    return {
      txt,
      onClick
    }
  }
})
</script>

<style lang="less" scoped>
.textarea {
  margin-bottom: 10px;
}
</style>
