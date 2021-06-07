<template>
  <div>
    <a-carousel autoplay class="carousel">
      <div class="image-wrapper">
        <img
          src="https://img30.360buyimg.com/sku/jfs/t1/160182/1/12734/114962/6048676eE8368ce21/56a7f2c626e66aaf.jpg"
          alt="banner"
        />
      </div>
      <div class="image-wrapper">
        <img
          src="https://img30.360buyimg.com/sku/jfs/t1/160182/1/12734/114962/6048676eE8368ce21/56a7f2c626e66aaf.jpg"
          alt="banner"
        />
      </div>
    </a-carousel>
  </div>
</template>

<script lang="ts">
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
.image-wrapper {
  display: inline-block;
}
</style>
