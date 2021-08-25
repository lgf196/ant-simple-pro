<template>
  <div class="com-page p20">
    <a-divider>顶部广告栏</a-divider>
    <TopAdvice :image-url="topConfig.imageUrl" :link-url="topConfig.linkUrl" :bg="topConfig.bg"></TopAdvice>
    <a-divider />
    <a-button type="primary" @click="onOpen">弹窗广告栏</a-button>
    <Popup
      :visible="popupConfig.visible"
      :on-close="popupConfig.onClose"
      :image-url="popupConfig.imageUrl"
      :link-url="popupConfig.linkUrl"
    ></Popup>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import TopAdvice from './components/top-advice.vue'
import Popup from './components/popup.vue'
export default defineComponent({
  name: 'Advice',
  components: {
    TopAdvice,
    Popup
  },
  setup() {
    console.log('setup')
    const popupVisible = ref(true)
    const topConfig = {
      imageUrl:
        'http://img30.360buyimg.com/pop/jfs/t1/167699/3/19263/31070/607cfaf8Ed0016163/86edcf393b26d657.jpg.webp',
      linkUrl: 'https://github.com/lgf196/ant-simple-pro',
      bg: 'rgb(200, 32, 32)'
    }
    const onClose = () => {
      popupVisible.value = false
      console.log('popupVisible.value', popupVisible.value)
    }
    const onOpen = () => {
      popupVisible.value = true
    }
    const popupConfig = {
      visible: popupVisible,
      onClose,
      imageUrl: 'https://antd-simple-pro.oss-cn-beijing.aliyuncs.com/image/1619162519739.png',
      linkUrl: 'https://github.com/lgf196/ant-simple-pro'
    }
    return {
      topConfig,
      popupConfig,
      onOpen
    }
  }
})
</script>

<style lang="less" scoped>
// ...
</style>
