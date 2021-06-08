<template>
  <div>
    <a-carousel autoplay class="carousel">
      <img
        src="https://img30.360buyimg.com/sku/jfs/t1/160182/1/12734/114962/6048676eE8368ce21/56a7f2c626e66aaf.jpg"
        alt="banner"
      />
      <img
        src="https://img30.360buyimg.com/sku/jfs/t1/160182/1/12734/114962/6048676eE8368ce21/56a7f2c626e66aaf.jpg"
        alt="banner"
      />
    </a-carousel>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'TempBanner'
})
</script>

<style lang="less" scoped>
.carousel {
  width: 100%;
  height: 100%;
  overflow: hidden;
  ::v-deep .slick-slider {
    height: 100%;
  }
  img {
    pointer-events: none;
  }
}
</style>
