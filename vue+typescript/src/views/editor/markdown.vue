<template>
  <div class="com-page p20">
    <ForEditor v-model:value="value"></ForEditor>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ForEditor from '@/components/for-editor'
export default defineComponent({
  name: 'MarkdownEditor',
  components: {
    ForEditor
  },
  setup() {
    const value = ref(`# ant-simple-pro
#### 简洁，美观，快速上手，支持3大框架(vue3.0,react,angular,typescript)`)
    return {
      value
    }
  }
})
</script>

<style lang="less" scoped>
// ...
</style>
