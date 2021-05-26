<template>
  <div class="com-page p20">
    <a-row :gutter="[10, 10]">
      <a-col :xs="24" :sm="24" :md="12" :lg="5" :xl="5">
        <VueQrcode
          ref="qrcodeRef"
          canvasClass="canvas-qrcode"
          :value="config.linkUrl"
          :size="config.size"
          :style="{ margin: 'auto' }"
          :imageSettings="{
            src: config.logoUrl,
            width: config.logoW,
            height: config.logoH,
            excavate: config.excavate
          }"
        ></VueQrcode>
        <a-button type="primary" @click="onDown" class="mt10">
          下载二维码
        </a-button>
      </a-col>
      <a-col :xs="24" :sm="24" :md="12" :lg="19" :xl="19">
        <a-form
          class="form"
          :model="form"
          :rules="rules"
          @finish="onFinish"
          label-align="left"
        >
          <a-form-item label="链接url" name="linkUrl">
            <a-input v-model:value="form.linkUrl" placeholder="请填写" />
          </a-form-item>
          <a-form-item label="二维码大小" name="size">
            <a-input-number
              v-model:value="form.size"
              placeholder="请填写"
              :min="50"
            />
          </a-form-item>
          <a-form-item name="fileList">
            <template #label>
              <span>中间logo图url</span>
              <span class="text-color-danger">必须是透明的底</span>
            </template>
            <ComUploadImage
              v-model:value="form.fileList"
              :limit="1"
            ></ComUploadImage>
          </a-form-item>
          <a-form-item label="logo宽" name="logoW">
            <a-input-number
              v-model:value="form.logoW"
              placeholder="请填写"
              :min="10"
            />
          </a-form-item>
          <a-form-item label="logo高" name="logoH">
            <a-input-number
              v-model:value="form.logoH"
              placeholder="请填写"
              :min="10"
            />
          </a-form-item>
          <a-form-item label="是否镂空" name="excavate">
            <a-switch v-model:checked="form.excavate"></a-switch>
          </a-form-item>
          <a-form-item class="form-item--submit">
            <a-button class="submit-btn" type="primary" html-type="submit">
              生成二维码
            </a-button>
          </a-form-item>
        </a-form>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, ComponentPublicInstance } from 'vue'
import { saveAs } from 'file-saver'
import VueQrcode from '@/components/qrcode'
import Logo from '@/assets/images/Icon_512x512-15@1x@1x.png'
const defalutVal = {
  linkUrl: 'https://lgf196.top/react/home',
  size: 200,
  logoUrl: Logo,
  logoW: 70,
  logoH: 70,
  excavate: false
}
type FormDataType = {
  linkUrl: string
  size: number
  fileList: string[]
  logoW: number
  logoH: number
  excavate: boolean
}
export default defineComponent({
  components: {
    VueQrcode
  },
  setup() {
    const linkUrl = ref(defalutVal.linkUrl)
    const logoUrl = ref<string>(Logo)
    const qrcodeRef = ref<ComponentPublicInstance | null>(null)
    const rules = ref({
      linkUrl: [{ required: true, message: '请填写' }],
      size: [{ required: true, message: '请填写' }]
    })
    const form = ref({
      linkUrl: defalutVal.linkUrl,
      size: defalutVal.size,
      fileList: [Logo],
      logoW: defalutVal.logoW,
      logoH: defalutVal.logoH,
      excavate: defalutVal.excavate
    })
    const config = ref({
      linkUrl: defalutVal.linkUrl,
      size: defalutVal.size,
      logoUrl: Logo,
      logoW: defalutVal.logoW,
      logoH: defalutVal.logoH,
      excavate: defalutVal.excavate
    })

    function onDown() {
      // const canvas = unref(qrcodeRef)
      const canvas = document.querySelector(
        '.canvas-qrcode'
      ) as HTMLCanvasElement
      console.log('canvas', canvas)
      canvas.setAttribute('crossorigin', 'Anonymous')
      canvas.toBlob(blob => {
        if (blob) {
          saveAs(blob, 'ant-simple-pro.png')
        }
      })
    }

    function onFinish(values: FormDataType) {
      const { fileList, ...otherValues } = values
      config.value = Object.assign({}, otherValues, {
        logoUrl: fileList[0]
      })
    }

    return {
      linkUrl,
      logoUrl,
      qrcodeRef,
      form,
      rules,
      config,
      onDown,
      onFinish
    }
  }
})
</script>

<style lang="less" scoped>
.form {
  ::v-deep .ant-form-item {
    display: flex;
  }
  ::v-deep .ant-form-item-control-wrapper {
    flex: 1;
  }
}
</style>
