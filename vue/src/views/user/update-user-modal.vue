<template>
  <a-modal title="编辑" :visible="visible" @cancel="onClose">
    <a-form
      ref="form"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-item label="名称" name="username">
        <a-input
          v-model:value="form.username"
          placeholder="请输入"
          allowClear
        ></a-input>
      </a-form-item>
      <a-form-item label="介绍" name="introduct">
        <a-input
          v-model:value="form.introduct"
          placeholder="请输入"
          allowClear
        ></a-input>
      </a-form-item>
      <a-form-item label="头像" name="iconUrl">
        <ComUploadImage v-model:value="form.iconUrl"></ComUploadImage>
      </a-form-item>
    </a-form>
    <template #footer>
      <a-button type="primary" :loading="submitting" @click="onSubmit"
        >编辑</a-button
      >
      <a-button @click="onReset">重置</a-button>
    </template>
  </a-modal>
</template>

<script>
import { updateUser } from './service'
export default {
  emits: ['update:visible', 'updateSuccess'],
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    currentRow: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      submitting: false,
      form: {
        id: null,
        username: '',
        introduct: '',
        iconUrl: ''
      },
      rules: {
        username: [{ required: true, message: '请输入名称' }]
      }
    }
  },
  watch: {
    visible(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          this.form = {
            id: this.currentRow.id,
            username: this.currentRow.username || '',
            introduct: this.currentRow.introduct || '',
            iconUrl: this.currentRow.iconUrl || ''
          }
        })
      }
    }
  },
  methods: {
    onClose() {
      this.updateVisible(false)
      this.cancel && this.cancel()
    },
    onReset() {
      this.$refs.form.resetFields()
    },
    async onSubmit() {
      try {
        await updateUser(
          this.form,
          v => (this.submitting = v),
          cancel => (this.cancel = cancel)
        )
        this.$message.destroy()
        this.$message.success('编辑成功')
        this.$emit('updateSuccess')
        this.onClose()
      } catch (err) {
        console.log(err)
      }
    },
    updateVisible(val) {
      this.$emit('update:visible', val)
    }
  }
}
</script>

<style lang="less" scoped>
// ...
</style>
