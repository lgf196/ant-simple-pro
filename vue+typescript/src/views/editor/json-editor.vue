<template>
  <div class="com-page p20">
    <div ref="container"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue'
import JSONEditor from 'jsoneditor'
import 'jsoneditor/dist/jsoneditor.css'

const json = {
  array: [1, 2, 3],
  boolean: true,
  null: null,
  number: 123,
  object: { a: 'b', c: 'd' },
  string: 'Hello World'
}

export default defineComponent({
  setup() {
    const editorInstance = ref<JSONEditor>()
    const container = ref<HTMLDivElement>()

    onMounted(() => {
      if (container.value) {
        editorInstance.value = new JSONEditor(container.value, {
          mode: 'tree',
          onChangeJSON: val => {
            console.log('val', val)
          }
        })
        editorInstance.value.set(json)
      }
    })

    onBeforeUnmount(() => {
      if (editorInstance.value) {
        editorInstance.value.destroy()
      }
    })

    return {
      container
    }
  }
})
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
}
</style>
