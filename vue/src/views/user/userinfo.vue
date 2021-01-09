<template>
  <div class="com-page">
    <a-form
      class="user-form"
      ref="formRef"
      :model="form"
      layout="vertical"
      :rules="rules"
    >
      <a-form-item label="头像" name="iconUrl">
        <ComUploadImage v-model:value="form.iconUrl"></ComUploadImage>
      </a-form-item>
      <a-form-item label="email" name="email">
        <a-input
          v-model:value="form.email"
          placeholder="请输入"
          allowClear
          disabled
        />
      </a-form-item>
      <a-form-item label="名称" name="username">
        <a-input
          v-model:value="form.username"
          placeholder="请输入"
          allowClear
        />
      </a-form-item>
      <a-form-item label="名称" name="introduct">
        <a-textarea
          v-model:value="form.introduct"
          :autoSize="{ minRows: 4 }"
          placeholder="请输入"
        />
      </a-form-item>
      <a-form-item :label-col="{ span: 0 }">
        <a-button type="primary" :loading="submitting" @click="onSubmit"> 提交 </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { defineComponent, ref, reactive, toRefs, toRaw, onMounted, computed } from 'vue'
import store from '@/store'
import { message } from 'ant-design-vue'
import { updateUser } from './service'
export default defineComponent({
  name: 'UserInfo',
  setup() {
    const formRef = ref(null)
    const state = reactive({
      labelCol: { xs: {span: 24}, sm: {span: 6} },
      wrapperCol: { xs: {span: 24}, sm: {span: 18} },
      rules: {},
      submitting: false
    })

    const form = reactive({
      id: 0,
      iconUrl: '',
      email: '',
      username: '',
      introduct: ''
    })

    const currentUser = computed(() => {
      return store.getters.user
    })

    onMounted(() => {
      Object.assign(form, {
        id: currentUser.value.id,
        iconUrl: currentUser.value.iconUrl,
        email: currentUser.value.email,
        username: currentUser.value.username,
        introduct: currentUser.value.introduct
      })
    })

    function onSubmit() {
      if (!formRef.value) {
        return
      }
      formRef.value.validate()
        .then(async () => {
          const params = toRaw(form)
          console.log('form', params)
          await updateUser(
            params,
            v => (state.submitting = v)
          )
          store.dispatch('user/GetUserInfo')
          message.destroy()
          message.success('保存成功')
        })
        .catch(console.log)
    }

    return {
      ...toRefs(state),
      formRef,
      form,
      onSubmit
    }
  }
})
</script>

<style lang="less" scoped>
.com-page {
  padding: 20px;
}
.user-form {
  width: 75%;
}
</style>
