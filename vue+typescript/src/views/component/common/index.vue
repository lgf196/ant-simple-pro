<template>
  <div class="com-page p10">
    <ul>
      <li>
        <h3 class="h3">SvgIcon组件</h3>
        <div class="preview">
          <ComSvgIcon name="add"></ComSvgIcon>
          <ComSvgIcon name="chart"></ComSvgIcon>
          <ComSvgIcon name="bulb"></ComSvgIcon>
        </div>
        <p class="paragraph">
          svg 为当前主流的图标使用方式，项目内置 <code>SvgIcon</code> 组件，将 svg 文件统一放在 <code>assets/icons/svg</code> 目录下，
          <code>svg-sprite-loader</code> 插件会将 svg 注入到 dom 节点中，通过 <code>SvgIcon</code> 来引用
        </p>
      </li>
      <li>
        <h3 class="h3">UploadImage组件</h3>
        <div class="preview">
          <ComUploadImage v-model:value="url"></ComUploadImage>
          <ComUploadImage v-model:value="urls"></ComUploadImage>
        </div>
        <p class="paragraph">
          上传图片是开发中常见的需求，项目内置 <code>UploadImage</code> 组件，基于 ant-design-vue <code>upload</code> 组件二次封装，
          支持双向绑定和多图上传
        </p>
      </li>
      <li>
        <h3 class="h3">ImagePreview组件</h3>
        <div class="preview">
          <a-button @click="onPreview">点击预览</a-button>
        </div>
        <p class="paragraph">
          ImagePreview 组件基于 element-ui 的 image 组件二次开发，使用直接 从 <code>@/components/image/image-preview</code> 导入 <code>imagePreview</code> 方法，
          直接调用方法传入对应的参数即可
        </p>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs, onBeforeUnmount } from 'vue'
import imagePreview from '@/components/image/image-preview'
export default defineComponent({
  name: 'Common',
  setup() {
    const url = ref('')
    const state = reactive({
      urls: [] as string[]
    })
    const timer = setTimeout(() => {
      url.value = 'https://antd-simple-pro.oss-cn-beijing.aliyuncs.com/image/1600419769390.jpeg'
      state.urls = [
        'https://antd-simple-pro.oss-cn-beijing.aliyuncs.com/image/1600419769390.jpeg',
        'https://antd-simple-pro.oss-cn-beijing.aliyuncs.com/image/1606805525442.jpg'
      ]
    }, 1000)
    onBeforeUnmount(() => {
      clearTimeout(timer)
    })
    function onPreview() {
      imagePreview({
        urlList: [
          'https://antd-simple-pro.oss-cn-beijing.aliyuncs.com/image/1600419769390.jpeg',
          'https://antd-simple-pro.oss-cn-beijing.aliyuncs.com/image/1606805525442.jpg'
        ],
        initialIndex: 1
      })
    }
    return {
      url,
      ...toRefs(state),
      onPreview
    }
  }
})
</script>

<style lang="less" scoped>
  .h3 {
    margin-bottom: 10px;
    font-weight: 700;
  }
  .preview {
    margin-bottom: 10px;
    ::v-deep .svg-icon {
      color: @color-theme;
      font-size: 30px;
    }
  }
  .paragraph {
    margin-bottom: 10px;
  }
  code {
    margin: 0 1px;
    padding: .2em .4em;
    font-size: .9em;
    background: #f2f4f5;
    border: 1px solid #f0f0f0;
    border-radius: 3px;
  }
</style>
