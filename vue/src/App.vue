<template>
  <a-config-provider :locale="zhCN">
    <router-view />
  </a-config-provider>
</template>

<script>
import { defineComponent } from 'vue'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
export default defineComponent({
  data() {
    return {
      zhCN
    }
  }
})
</script>
