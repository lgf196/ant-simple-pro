<template>
  <div class="popup">
    <transition name="com-fade-in-linear">
      <div class="shadow" v-show="visible"></div>
    </transition>
    <transition name="com-zoom-in-center">
      <div class="wrapper" v-show="visible">
        <div class="wrapper-inner">
          <CloseOutlined class="close" @click="onClose" />
          <a class="link" :href="linkUrl">
            <img class="image" :src="imageUrl" alt="advice" />
          </a>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, PropType, Ref } from 'vue'
import { CloseOutlined } from '@ant-design/icons-vue'
export default defineComponent({
  components: {
    CloseOutlined
  },
  props: {
    visible: {
      type: Object as PropType<Ref<boolean>>,
      default: true
    },
    linkUrl: {
      type: String,
      default: ''
    },
    imageUrl: {
      type: String,
      default: ''
    },
    onClose: {
      type: Function,
      default: () => {} // eslint-disable-line
    }
  },
  setup(props) {
    const { visible, linkUrl, imageUrl } = toRefs(props)
    return {
      visible,
      linkUrl,
      imageUrl,
      onClose: props.onClose
    }
  }
})
</script>

<style lang="less" scoped>
.popup {
  width: 100%;
  height: 100%;
  .shadow {
    z-index: 3000;
    .mask;
    background-color: rgba(0, 0, 0, 0.45);
  }
  .wrapper {
    z-index: 3100;
    .mask;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .wrapper-inner {
    position: relative;
  }
  .close {
    position: absolute;
    top: -30px;
    right: -30px;
    font-size: 30px;
    color: #fff;
  }
  .link {
    display: block;
  }
  .image {
    max-width: 750px;
  }
}
</style>
