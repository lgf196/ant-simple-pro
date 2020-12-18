<template>
  <div class="home">
    home{{count}}
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const count = ref(1)
    return {
      count
    }
  }
})
</script>
