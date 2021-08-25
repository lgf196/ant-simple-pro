<template>
  <a-upload
    v-model:fileList="fileList"
    class="image-uploader"
    action="/api/fileUpload"
    name="file"
    list-type="picture-card"
    :multiple="isMultiple"
    :show-upload-list="isMultiple"
    :before-upload="beforeUpload"
    :remove="onRemove"
    @change="handleChange"
    @preview="onPreview"
  >
    <template v-if="isSingle">
      <ComImage v-if="value" class="image" :src="value" alt="avatar" fit="cover" />
      <div v-else>
        <LoadingOutlined v-if="loading" />
        <PlusOutlined v-else />
        <div class="ant-upload-text">上传图片</div>
      </div>
    </template>
    <template v-else>
      <PlusOutlined v-if="fileList.length < limit" />
    </template>
  </a-upload>
</template>

<script>
import { defineComponent } from 'vue'
// import { VcFile } from 'ant-design-vue/es/upload/interface'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { getRandomStr } from '@/utils'
import { imagePreview } from '@/components/image/image-preview'

export default defineComponent({
  components: {
    LoadingOutlined,
    PlusOutlined
  },
  emits: ['update:value', 'change', 'input', 'file-change'],
  props: {
    limit: {
      type: Number,
      default: 8
    },
    limitSize: {
      type: Number,
      default: 2
    },
    value: {
      type: [String, Array],
      default: ''
    },
    mode: {
      type: String,
      default: 'single'
    },
    autoUpload: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      loading: false,
      fileList: [],
      inited: false
    }
  },
  computed: {
    isSingle() {
      return typeof this.value === 'string'
    },
    isMultiple() {
      return Array.isArray(this.value)
    }
  },
  watch: {
    value: {
      handler() {
        this.updateFileList()
      },
      deep: true
    }
  },
  mounted() {
    this.updateFileList()
  },
  methods: {
    updateFileList() {
      if (this.isMultiple && !this.inited) {
        if (!Array.isArray(this.value) || !this.value.length) {
          return
        }
        console.log('updateFileList', this.value)
        this.inited = true
        this.fileList = this.value.map(url => ({
          uid: getRandomStr(),
          name: url.replace(/.+\//, ''),
          url
        }))
      }
    },
    emitValue(val) {
      this.$emit('update:value', val)
      this.$emit('change', val)
      this.$emit('input', val)
    },
    handleChange(info) {
      // console.log(this.fileList)
      if (info.file.status === 'uploading') {
        this.loading = true
        return
      }
      if (info.file.status === 'done') {
        const url = info.file.response.data.url
        if (this.isSingle) {
          this.emitValue(url)
        } else {
          this.emitValue(this.value.concat(url))
        }
        this.loading = false
      }
    },
    beforeUpload(file) {
      if (this.isMultiple && this.limit && this.limit === this.fileList.length) {
        message.destroy()
        message.error(`最多上传 ${this.limit} 张!`)
        return false
      }
      const isImg = /^image\/\w+$/i.test(file.type)
      if (!isImg) {
        message.destroy()
        message.error('只能上传 JPG、PNG、GIF 格式!')
        return false
      }
      const isLtMB = file.size / 1024 / 1024 < this.limitSize
      if (!isLtMB) {
        message.destroy()
        message.error(`最大不能超过 ${this.limitSize}M !`)
        return false
      }
      if (!this.autoUpload) {
        return new Promise(resolve => {
          this.$emit('file-change', file, resolve)
        })
      }
      return this.autoUpload
    },
    onRemove(file) {
      const ret = this.fileList.filter(v => v.uid !== file.uid).map(v => v.url)
      this.emitValue(ret)
      return true
    },
    onPreview(file) {
      imagePreview({
        urlList: this.fileList.map(v => v.url || (v.response && v.response.data && v.response.data.url) || v.thumbUrl),
        initialIndex: this.fileList.findIndex(v => v.uid === file.uid)
      })
    }
  }
})
</script>

<style lang="less" scoped>
.image-uploader {
  ::v-deep(.ant-upload) {
    .ant-upload {
      position: relative;
    }

    .com-image {
      position: absolute;
      top: 8px;
      left: 8px;
      right: 8px;
      bottom: 0;

      .image {
        height: auto;
      }
    }
  }
}
</style>
