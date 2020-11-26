<template>
  <a-upload
    class="image-uploader"
    action="/server/mock/upload"
    name="file"
    list-type="picture-card"
    :multiple="isMultiple"
    :show-upload-list="isMultiple"
    :before-upload="beforeUpload"
    @change="handleChange"
    v-model:fileList="fileList"
  >
    <ComImage v-if="value" :src="value" alt="avatar" />
    <div v-else>
      <LoadingOutlined v-if="loading" />
      <PlusOutlined v-else />
      <div class="ant-upload-text">
        上传图片
      </div>
    </div>
  </a-upload>
</template>

<script>
import {
  LoadingOutlined,
  PlusOutlined
} from '@ant-design/icons-vue'
export default {
  emits: ['update:value', 'change'],
  components: {
    LoadingOutlined,
    PlusOutlined
  },
  props: {
    limitSize: {
      type: Number,
      default: 2
    },
    value: {
      type: [String, Array],
      default: ''
    },
    mode: {
      validator(value) {
        return ['single', 'multiple'].indexOf(value) >= 0
      },
      default: 'single'
    }
  },
  data() {
    return {
      loading: false,
      fileList: []
    }
  },
  computed: {
    isSingle() {
      return this.mode === 'single'
    },
    isMultiple() {
      return this.mode === 'multiple'
    }
  },
  methods: {
    handleChange(info) {
      console.log(this.fileList)
      if (info.file.status === 'uploading') {
        this.loading = true
        return
      }
      if (info.file.status === 'done') {
        const value = info.file.response.data
        this.$emit('update:value', value)
        this.$emit('change', value)
        this.loading = false
      }
    },
    beforeUpload(file) {
      const isImg = /^image\/\w+$/i.test(file.type)
      if (!isImg) {
        this.$message.destroy()
        this.$message.error('只能上传 JPG、PNG、GIF 格式!')
        return false
      }
      const isLtMB = file.size / 1024 / 1024 < this.limitSize
      if (!isLtMB) {
        this.$message.destroy()
        this.$message.error(`最大不能超过 ${this.limitSize}M !`)
        return false
      }
      return true
    }
  }
}
</script>

<style lang="less" scoped>
  // .image-uploader {}
</style>
