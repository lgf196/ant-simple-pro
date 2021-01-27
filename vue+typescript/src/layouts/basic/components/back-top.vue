<template>
  <a-back-top class="basic-back-top">
    <div class="back-top">
      <VerticalAlignTopOutlined />
    </div>
  </a-back-top>
</template>

<script>
import { defineComponent } from 'vue'
import { VerticalAlignTopOutlined } from '@ant-design/icons-vue'
export default defineComponent({
  components: {
    VerticalAlignTopOutlined
  }
})
</script>

<style lang="less" scoped>
.basic-back-top {
  right: 30px;
  bottom: 30px;
}
.back-top {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 44px;
  line-height: 44px;
  font-size: 22px;
  color: #000;
  background-color: #fff;
  box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12),
    0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
  transition: color 0.3s;
  border-radius: 50%;
  &:hover {
    color: #1890ff;
  }
}
</style>
