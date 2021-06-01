<template>
  <div class="com-page p20">
    <a-button type="primary" @click="onClick">打开</a-button>
    <p>{{ count }}</p>
    <p>{{ counter }}</p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref } from 'vue'
function useColor(props: { count: Ref<number> }) {
  const { count } = props
  const counter = computed(() => {
    return count.value * 2
  })
  return counter
}
export default defineComponent({
  setup() {
    const count = ref(0)
    const counter = useColor({ count })
    function onClick() {
      count.value += 1
    }
    return {
      count,
      onClick,
      counter
    }
  }
})
</script>

<style lang="less" scoped>
// ...
</style>
