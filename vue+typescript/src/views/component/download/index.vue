<template>
  <div class="com-page p20">
    <a-row :gutter="[10, 10]">
      <a-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
        <div class="col-inner">
          <h4 class="mb10">图片下载</h4>
          <img class="image" :src="imageUrl" alt="404" />
          <div class="mb10"></div>
          <a-button type="primary" @click="onImageDownload">保存</a-button>
        </div>
      </a-col>
      <a-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
        <div class="col-inner">
          <h4 class="mb10">canvas下载</h4>
          <VueQrcode
            ref="qrcodeRef"
            canvasClass="canvas-qrcode"
            :value="qrcode.linkUrl"
            :size="qrcode.size"
            :style="{ margin: 'auto' }"
            :imageSettings="{
              src: qrcode.logoUrl,
              width: qrcode.logoW,
              height: qrcode.logoH,
              excavate: qrcode.excavate
            }"
          ></VueQrcode>
          <div class="mb10"></div>
          <a-button type="primary" @click="onCanvasDownload">保存</a-button>
        </div>
      </a-col>
      <a-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
        <div class="col-inner">
          <h4 class="mb10">文件下载</h4>
          <p>{{ fileDownloadDescription }}</p>
          <p class="p20">下载格式类型</p>
          <a-radio-group v-model:value="radioValue">
            <a-radio :value="1">txt格式</a-radio>
            <a-radio :value="2">html格式</a-radio>
            <a-radio :value="3">xlsx格式</a-radio>
          </a-radio-group>
          <div class="mb10"></div>
          <a-button type="primary" @click="onFileDownload">保存</a-button>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, unref } from 'vue'
import { saveAs } from 'file-saver'
import { defalutVal as qrcodeDefaultData } from '@/views/qrcode/index.vue'
import VueQrcode from '@/components/qrcode'
type RadioValue = 1 | 2 | 3
export default defineComponent({
  components: {
    VueQrcode
  },
  setup() {
    const imageUrl = ref('http://blog.lgf196.top/ant-simple-pro-document/logon.png')
    const qrcode = reactive(qrcodeDefaultData)
    const fileDownloadDescription = ref(
      '简洁，美观，快速上手，支持3大框架，typescript；Concise, beautiful, quick to get started, support 3 big frameworks'
    )
    const radioValue = ref<RadioValue>(1)

    function onImageDownload() {
      saveAs(imageUrl.value, 'ant-simple-pro.png')
    }

    function onCanvasDownload() {
      const canvas = document.querySelector('.canvas-qrcode') as HTMLCanvasElement
      canvas.setAttribute('crossorigin', 'Anonymous')
      canvas.toBlob(blob => {
        if (blob) {
          saveAs(blob, 'ant-simple-pro.png')
        }
      })
    }

    const fileName = computed(() => {
      return {
        1: 'ant-simple-pro.txt',
        2: 'ant-simple-pro.html',
        3: 'ant-simple-pro.xlsx'
      }[radioValue.value]
    })

    function onFileDownload() {
      const file = new File([fileDownloadDescription.value], unref(fileName), {
        type: 'text/plain;charset=utf-8'
      })
      saveAs(file)
    }

    return {
      imageUrl,
      onImageDownload,
      qrcode,
      onCanvasDownload,
      radioValue,
      fileDownloadDescription,
      onFileDownload
    }
  }
})
</script>

<style lang="less" scoped>
.col-inner {
  height: 320px;
  padding: 10px;
  border: 1px solid #f0f0f0;
  text-align: center;
}
.image {
  display: block;
  margin: 0 auto;
}
</style>
