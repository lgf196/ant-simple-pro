<template>
  <div class="com-page">
    <a-form
      ref="formRef"
      :model="form"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      labelAlign="left"
      :rules="rules"
    >
      <a-form-item label="姓名" name="username">
        <a-input
          v-model:value="form.username"
          placeholder="请填写"
          allowClear
        />
      </a-form-item>
      <a-form-item label="外号" name="nickname">
        <a-input
          v-model:value="form.nickname"
          placeholder="请填写"
          allowClear
        />
      </a-form-item>
      <a-form-item label="性别" name="sex">
        <a-radio-group v-model:value="form.sex">
          <a-radio :value="1">男</a-radio>
          <a-radio :value="2">女</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="爱好" name="hobby">
        <a-checkbox-group v-model:value="form.hobby">
          <a-checkbox
            v-for="(item, index) in hobbyOptions"
            :key="index"
            :value="item.value"
          >
            {{ item.label }}
          </a-checkbox>
        </a-checkbox-group>
      </a-form-item>
      <a-form-item label="日期" name="date">
        <a-range-picker
          v-model:value="form.date"
          valueFormat="YYYY-MM-DD"
          allowClear
        />
      </a-form-item>
      <a-form-item label="技术栈" name="skill">
        <a-select
          mode="multiple"
          placeholder="请选择"
          v-model:value="form.skill"
          allowClear
        >
          <a-select-option
            v-for="(item, index) in skillList"
            :key="index"
            :value="item.id"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="照片" name="photo">
        <ComUploadImage v-model:value="form.photo"></ComUploadImage>
      </a-form-item>
      <a-form-item label="描述" name="description">
        <a-textarea
          v-model:value="form.description"
          :autoSize="{ minRows: 2 }"
          placeholder="请填写"
        />
      </a-form-item>
      <a-form-item :label-col="{ span: 0 }" name="remember">
        <a-checkbox v-model:checked="form.remember">记住</a-checkbox>
      </a-form-item>
      <a-form-item :label-col="{ span: 0 }">
        <a-button type="primary" @click="onSubmit"> 提交 </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  toRefs,
  onMounted,
  onBeforeUnmount,
  toRaw
} from 'vue'
import { message } from 'ant-design-vue'
import { useForm } from '@ant-design-vue/use'
import { Form } from 'ant-design-vue/types/form/form'
export default defineComponent({
  name: 'FormPage',
  setup() {
    const formRef = ref<Form | null>(null)
    const state = reactive({
      labelCol: { span: 2 },
      wrapperCol: { span: 9 },
      rules: {
        username: [{ required: true, message: '请填写姓名' }],
        nickname: [{ required: true, message: '请填写外号' }],
        date: [{ required: true, message: '请选择日期' }]
      },
      hobbyOptions: [
        { label: '篮球', value: 1 },
        { label: '乒乓球', value: 2 },
        { label: '羽毛球', value: 3 },
        { label: '游泳', value: 4 },
        { label: '跑步', value: 5 }
      ],
      skillList: [
        { name: 'react', id: 1 },
        { name: 'vue', id: 2 },
        { name: 'angular', id: 3 },
        { name: 'webpack', id: 4 },
        { name: 'docker', id: 5 },
        { name: 'node', id: 6 },
        { name: 'typescript', id: 7 },
        { name: 'qiankun', id: 8 }
      ]
    })

    const form = reactive({
      username: '枫叶',
      nickname: '帅锋锋',
      sex: 2,
      hobby: [2, 4, 5],
      date: ['2020-09-03', '2020-11-22'],
      skill: [1, 6, 7, 8],
      photo: reactive([]) as string[],
      description: '',
      remember: true
    })
    const rulesRef = reactive({
      username: [{ required: true, message: '请填写姓名' }],
      nickname: [{ required: true, message: '请填写外号' }],
      date: [{ required: true, message: '请选择日期' }]
    })

    const { validate } = useForm(form, rulesRef)

    let timer: number | null = null

    onMounted(() => {
      timer = window.setTimeout(() => {
        Object.assign(form, {
          photo: [
            'https://antd-simple-pro.oss-cn-beijing.aliyuncs.com/image/1600419769390.jpeg'
          ]
        })
      }, 1000)
    })

    onBeforeUnmount(() => {
      timer && window.clearTimeout(timer)
    })

    function onSubmit() {
      validate()
        .then(() => {
          console.log('form', toRaw(form))
          message.destroy()
          message.success('保存成功')
        })
        .catch(console.log)
    }

    return {
      ...toRefs(state),
      form,
      formRef,
      onSubmit
    }
  }
})
</script>

<style lang="less" scoped>
.com-page {
  padding-top: 20px;
  padding-left: 20px;
}
</style>
