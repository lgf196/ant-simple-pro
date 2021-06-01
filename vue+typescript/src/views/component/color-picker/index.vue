<template>
  <div class="com-page p20" :style="{ background: color }">
    <a-row :gutter="[20, 20]" type="flex">
      <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <Sketch v-model:value="color"></Sketch>
      </a-col>
      <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <Swatch v-model:value="color"></Swatch>
      </a-col>
      <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <Chrome v-model:value="color"></Chrome>
      </a-col>
      <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <Compact v-model:value="color"></Compact>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Sketch, Swatch, Chrome, Compact } from '@/components/vue-color'

export default defineComponent({
  components: {
    Sketch,
    Swatch,
    Chrome,
    Compact
  },
  setup() {
    const color = ref('#fff')
    return {
      color
    }
  }
})
</script>

<style lang="less" scoped>
// ...
</style>
