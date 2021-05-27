<template>
  <a-modal title="编辑" :visible="visible" @cancel="onClose">
    <a-form ref="formRef" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item label="名称" name="username">
        <a-input v-model:value="form.username" placeholder="请输入" allowClear></a-input>
      </a-form-item>
      <a-form-item label="介绍" name="introduct">
        <a-input v-model:value="form.introduct" placeholder="请输入" allowClear></a-input>
      </a-form-item>
      <a-form-item label="头像" name="iconUrl">
        <ComUploadImage v-model:value="form.iconUrl"></ComUploadImage>
      </a-form-item>
    </a-form>
    <template #footer>
      <a-button type="primary" :loading="submitting" @click="onSubmit"> 编辑 </a-button>
      <a-button @click="onReset">重置</a-button>
    </template>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, nextTick, ref, reactive, toRefs, watch } from 'vue'
import { Canceler } from 'axios'
import { message } from 'ant-design-vue'
import { Form } from 'ant-design-vue/types/form/form'
import { updateUser } from './service'

export default defineComponent({
  emits: ['update:visible', 'update-success'],
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
  setup(props, { emit }) {
    const state = reactive({
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      submitting: false,
      form: {
        id: 0,
        username: '',
        introduct: '',
        iconUrl: ''
      },
      rules: {
        username: [{ required: true, message: '请输入名称' }]
      }
    })
    const formRef = ref<Form | null>(null)
    let cancel: Canceler | null = null

    // 打开弹窗时 回显数据
    watch(
      () => props.visible,
      newVal => {
        if (newVal) {
          nextTick(() => {
            state.form = {
              id: props.currentRow.id || 0,
              username: props.currentRow.username || '',
              introduct: props.currentRow.introduct || '',
              iconUrl: props.currentRow.iconUrl || ''
            }
          })
        }
      }
    )

    function updateVisible(val: boolean) {
      emit('update:visible', val)
    }

    function onClose() {
      updateVisible(false)
      cancel && cancel()
    }

    function onReset() {
      const form = formRef.value
      if (!form) {
        return
      }
      form.resetFields()
    }

    async function onSubmit() {
      try {
        await updateUser(
          state.form,
          v => (state.submitting = v),
          c => (cancel = c)
        )
        message.destroy()
        message.success('编辑成功')
        emit('update-success')
        onClose()
      } catch (err) {
        console.log(err)
      }
    }

    return {
      ...toRefs(state),
      formRef,
      updateVisible,
      onClose,
      onReset,
      onSubmit
    }
  }
})
</script>

<style lang="less" scoped>
// ...
</style>
