<template>
  <div class="com-page">
    <PieCustom></PieCustom>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import PieCustom from './components/pie-custom.vue'
export default defineComponent({
  components: {
    PieCustom
  },
  setup() {
    console.log('setup')
  }
})
</script>

<style lang="less" scoped>
// ...
</style>
