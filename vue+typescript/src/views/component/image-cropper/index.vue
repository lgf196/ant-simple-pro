<template>
  <div class="com-page p20">
    <CropImage v-model:visible="visible" :file="fileRef" @submit="onCropSubmit"></CropImage>
    <ComUploadImage
      ref="uploadImage"
      v-model:value="photo"
      :auto-upload="false"
      @file-change="onFileChange"
    ></ComUploadImage>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import CropImage from '@/components/cropper/index.vue'
import { UploadImageComponent } from '@/components/upload-image/types'

export default defineComponent({
  components: {
    CropImage
  },
  setup() {
    const visible = ref(false)
    const photo = ref<string[]>([])
    const uploadImage = ref<UploadImageComponent>()
    const resolveFile = ref<(file: File) => void>()
    const fileRef = ref<File>()

    function onFileChange(file: File, resolve: (file: File) => void) {
      fileRef.value = file
      visible.value = true
      resolveFile.value = resolve
    }

    function onCropSubmit(file: File) {
      if (resolveFile.value) {
        resolveFile.value(file)
      }
    }

    return {
      visible,
      fileRef,
      photo,
      uploadImage,
      onFileChange,
      onCropSubmit
    }
  }
})
</script>

<style lang="less" scoped>
// ...
</style>
