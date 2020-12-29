<template>
  <div class="spin-wrapper">
    <Spin size="large" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Spin } from 'ant-design-vue'

export default defineComponent({
  name: 'IconPage',
  components: {
    Spin
  },
  setup() {
    return {}
  }
})
</script>

<style lang="less" scoped>
.spin-wrapper {
  padding-top: 100px;
  text-align: center;
}
</style>
