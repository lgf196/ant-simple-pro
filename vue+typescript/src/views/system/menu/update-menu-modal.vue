<template>
  <a-modal :title="title" :visible="visible" @cancel="onClose">
    <a-form ref="formRef" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item label="菜单名字" name="title">
        <a-input v-model:value="form.title" placeholder="请输入" allowClear></a-input>
      </a-form-item>
      <a-form-item label="菜单url" name="url">
        <a-input v-model:value="form.url" placeholder="请输入" allowClear></a-input>
      </a-form-item>
      <a-form-item label="菜单icon" name="icon">
        <a-input v-model:value="form.icon" placeholder="请输入" allowClear></a-input>
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
      <a-button type="primary" :loading="submitting" @click="onSubmit">
        {{ currentRow.id ? '编辑' : '创建' }}
      </a-button>
      <a-button @click="onReset">重置</a-button>
    </template>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, nextTick, ref, reactive, toRefs, watch, computed } from 'vue'
import { Canceler } from 'axios'
import { message } from 'ant-design-vue'
import { Form } from 'ant-design-vue/types/form/form'
import { updateMenu, UpdateMenuParams } from './service'

type FormType = Omit<UpdateMenuParams, 'pid'> & {
  pid: number[]
}

export default defineComponent({
  emits: ['update:visible', 'update-success', 'create-success'],
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
  setup(props, { emit }) {
    const state = reactive({
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      submitting: false,
      form: {
        id: null,
        title: '',
        url: '',
        icon: '',
        pid: []
      } as FormType
    })

    const formRef = ref<Form | null>(null)
    let cancel: Canceler | null = null

    const title = computed(() => {
      return props.currentRow.id ? '编辑' : '新增'
    })

    const rules = computed(() => {
      return {
        title: [{ required: true, message: '请输入菜单名字' }],
        url: [{ required: true, message: '请输入菜单url' }],
        icon: [{ required: !props.currentRow.id, message: '请输入菜单icon' }]
      }
    })

    // 打开弹窗时 回显数据
    watch(
      () => props.visible,
      newVal => {
        if (newVal) {
          nextTick(() => {
            state.form = {
              id: props.currentRow.id || null,
              title: props.currentRow.title || '',
              url: props.currentRow.url || '',
              icon: props.currentRow.icon || '',
              pid: props.currentRow.pid ? [props.currentRow.pid] : []
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
        const params = {
          ...state.form,
          pid: state.form.pid.length ? state.form.pid : null
        }
        await updateMenu(
          params,
          v => (state.submitting = v),
          c => (cancel = c)
        )
        message.destroy()
        message.success(title.value + '成功')
        emit(props.currentRow.id ? 'update-success' : 'create-success')
        onClose()
      } catch (err) {
        console.log(err)
      }
    }

    return {
      ...toRefs(state),
      title,
      rules,
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
