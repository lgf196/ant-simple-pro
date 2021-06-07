<template>
  <div class="font-size-16 font-weight-bold">
    <NotificationOutlined />
    <span class="p10">ant-simple-pro上线了！</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { NotificationOutlined } from '@ant-design/icons-vue'
export default defineComponent({
  name: 'TempNews',
  components: {
    NotificationOutlined
  }
})
</script>
