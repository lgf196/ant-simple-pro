<template>
  <a-modal :title="title" :visible="visible" @cancel="onClose">
    <a-form
      ref="form"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-item label="菜单名字" name="title">
        <a-input
          v-model:value="form.title"
          placeholder="请输入"
          allowClear
        ></a-input>
      </a-form-item>
      <a-form-item label="菜单url" name="url">
        <a-input
          v-model:value="form.url"
          placeholder="请输入"
          allowClear
        ></a-input>
      </a-form-item>
      <a-form-item label="菜单icon" name="icon">
        <a-input
          v-model:value="form.icon"
          placeholder="请输入"
          allowClear
        ></a-input>
      </a-form-item>
      <a-form-item label="上级菜单" name="pid">
        <a-cascader
          v-model:value="form.pid"
          :options="menuCascaderOptions"
          placeholder="请选择"
          :fieldNames="{
            label: 'title',
            value: 'id',
            children: 'children'
          }"
        />
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
import { updateMenu } from './service'
export default {
  emits: ['update:visible', 'updateSuccess', 'createSuccess'],
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    currentRow: {
      type: Object,
      default: () => ({})
    },
    menuCascaderOptions: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      submitting: false,
      form: {
        id: null,
        title: '',
        url: '',
        icon: '',
        pid: []
      }
    }
  },
  computed: {
    title() {
      return this.currentRow.id ? '编辑' : '新增'
    },
    rules() {
      return {
        title: [{ required: true, message: '请输入菜单名字' }],
        url: [{ required: true, message: '请输入菜单url' }],
        icon: [{ required: !this.currentRow.id, message: '请输入菜单icon' }]
      }
    }
  },
  watch: {
    visible(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          this.form = {
            id: this.currentRow.id || null,
            title: this.currentRow.title || '',
            url: this.currentRow.url || '',
            icon: this.currentRow.icon || '',
            pid: this.currentRow.pid ? [this.currentRow.pid] : []
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
        const params = {
          ...this.form,
          pid: this.form.pid ? [this.form.pid] : null
        }
        await updateMenu(
          params,
          v => (this.submitting = v),
          cancel => (this.cancel = cancel)
        )
        this.$message.destroy()
        this.$message.success(this.title + '成功')
        this.$emit(this.currentRow.id ? 'updateSuccess' : 'createSuccess')
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
