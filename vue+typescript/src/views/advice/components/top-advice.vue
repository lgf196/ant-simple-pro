<template>
  <transition name="com-fade-in-linear">
    <div class="top-advice" v-show="visible">
      <a class="link" :href="linkUrl" :style="{ background: bg }">
        <div class="image" :style="{ backgroundImage: `url(${imageUrl})` }">
          <CloseOutlined class="close" @click.stop.prevent="onClose" />
        </div>
      </a>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, toRefs, ref } from 'vue'
import { CloseOutlined } from '@ant-design/icons-vue'
export default defineComponent({
  components: {
    CloseOutlined
  },
  props: {
    linkUrl: {
      type: String,
      default: ''
    },
    bg: {
      type: String,
      default: ''
    },
    imageUrl: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const { linkUrl, bg, imageUrl } = toRefs(props)
    const visible = ref(true)
    const onClose = () => {
      visible.value = false
    }
    return {
      linkUrl,
      bg,
      imageUrl,
      onClose,
      visible
    }
  }
})
</script>

<style lang="less" scoped>
.top-advice {
  .link {
    display: block;
    height: 80px;
  }
  .image {
    position: relative;
    height: 80px;
    background-size: cover;
    width: 1190px;
    margin: 0 auto;
    .close {
      z-index: 1000;
      position: absolute;
      top: 0;
      right: 0;
      font-size: 25px;
      color: #fff;
    }
  }
}
</style>
