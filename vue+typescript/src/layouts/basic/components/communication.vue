<template>
  <a-dropdown
    :trigger="['click']"
    placement="bottomCenter"
    v-model:visible="visible"
  >
    <QqOutlined />
    <template #overlay>
      <div class="group-overlay">
        <p>扫码，加入交流群，大牛多</p>
        <div class="image-wrapper">
          <ComImage
            src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6d6d3f624f4143fe8833d2458aeaf002~tplv-k3u1fbpfcp-zoom-1.image"
          ></ComImage>
        </div>
      </div>
    </template>
  </a-dropdown>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { QqOutlined } from '@ant-design/icons-vue'
export default defineComponent({
  components: {
    QqOutlined
  },
  setup() {
    const visible = ref(false)
    return {
      visible
    }
  }
})
</script>

<style lang="less" scoped>
.group-overlay {
  background: #fff;
  padding: 15px;
  border-radius: 4px;
  box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12),
    0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
}
.image-wrapper {
  width: 200px;
  height: 244px;
}
</style>
