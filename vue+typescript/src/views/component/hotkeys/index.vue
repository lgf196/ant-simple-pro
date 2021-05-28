<template>
  <div class="com-page p20">
    <ul>
      <li class="p20">按下<code>ctrl+d</code>键编辑当前文本</li>
      <li class="p20">按下<code>ctrl+s</code>键保存当前文本</li>
    </ul>
    <p class="p20">{{ text }}</p>
    <a-textarea v-model:value="text" type="textarea" :disabled="disabled" :autoSize="{ minRows: 3 }"></a-textarea>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useHotkeys } from '@/hooks'
export default defineComponent({
  setup() {
    const text = ref(
      '简洁，美观，快速上手，支持3大框架；Concise, beautiful, quick to get started, support 3 big frameworks'
    )
    const disabled = ref(true)

    useHotkeys('ctrl+d', event => {
      event.preventDefault()
      disabled.value = false
    })

    useHotkeys('ctrl+s', event => {
      event.preventDefault()
      disabled.value = true
    })

    return {
      text,
      disabled
    }
  }
})
</script>

<style lang="less" scoped>
// ...
</style>
