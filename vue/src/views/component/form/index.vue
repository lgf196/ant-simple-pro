<template>
  <div>
    <a-form :model="params">
      <a-form-item label="头像">
        <UploadImage v-model:value="params.avatar"></UploadImage>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="onSubmit">submit</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import UploadImage from '@/components/upload-image'
export default {
  name: 'Form',
  components: {
    UploadImage
  },
  data() {
    return {
      params: {
        avatar: ''
      }
    }
  },
  methods: {
    onSubmit() {
      console.log(this.params)
    }
  }
}
</script>

<style lang="less" scoped>
  // ...
</style>
