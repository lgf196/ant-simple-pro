<template>
  <div>
    <p>{{ counter }}</p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
export default defineComponent({
  props: {
    count: {
      type: Number,
      default: 0
    }
  },
  setup(props) {
    const counter = computed(() => {
      return props.count * 2
    })
    return {
      counter
    }
  }
})
</script>

<style lang="less" scoped>
// ...
</style>
