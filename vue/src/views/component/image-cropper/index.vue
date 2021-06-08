<template>
  <div class="com-page p20">
    <CropImage v-model:visible="visible" :src="src" @submit="onCropSubmit" :file="fileRef"></CropImage>
    <ComUploadImage
      ref="uploadImage"
      v-model:value="photo"
      :autoUpload="false"
      @file-change="onFileChange"
    ></ComUploadImage>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import CropImage from '@/components/cropper/index.vue'
import { fileToDataURI } from '@/utils/image'

export default defineComponent({
  components: {
    CropImage
  },
  setup() {
    const visible = ref(false)
    const src = ref('')
    const photo = ref([])
    const uploadImage = ref()
    const resolveFile = ref()
    const fileRef = ref()

    function onFileChange(file, resolve) {
      fileToDataURI(file).then(dataURI => {
        src.value = dataURI
        fileRef.value = file
        visible.value = true
      })
      resolveFile.value = resolve
    }

    function onCropSubmit(file) {
      if (resolveFile.value) {
        resolveFile.value(file)
      }
    }

    return {
      visible,
      src,
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
