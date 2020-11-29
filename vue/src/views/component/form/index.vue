<template>
  <div class="com-page">
    <a-form
      ref="form"
      :model="form"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      labelAlign="left"
      :rules="rules"
    >
      <a-form-item label="姓名" name="username">
        <a-input
          v-model:value="form.username"
          placeholder="请输入"
          allowClear
        />
      </a-form-item>
      <a-form-item label="外号" name="nickname">
        <a-input
          v-model:value="form.nickname"
          placeholder="请输入"
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
        <UploadImage v-model:value="form.photo"></UploadImage>
      </a-form-item>
      <a-form-item label="描述" name="description">
        <a-textarea
          v-model:value="form.description"
          :autoSize="{ minRows: 2 }"
          placeholder="请输入"
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

<script>
import UploadImage from '@/components/upload-image'
export default {
  name: 'Form',
  components: {
    UploadImage
  },
  data() {
    return {
      labelCol: { span: 2 },
      wrapperCol: { span: 9 },
      form: {
        username: '枫叶',
        nickname: '帅锋锋',
        sex: 2,
        hobby: [2, 4, 5],
        date: ['2020-09-03', '2020-11-22'],
        skill: [1, 6, 7, 8],
        photo: [],
        description: '',
        remember: true
      },
      rules: {
        username: [{ required: true, message: '请输入姓名' }],
        nickname: [{ required: true, message: '请输入外号' }],
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
    }
  },
  mounted() {
    setTimeout(() => {
      this.form.photo = [
        'https://antd-simple-pro.oss-cn-beijing.aliyuncs.com/image/1600419769390.jpeg'
      ]
    }, 1000)
  },
  methods: {
    onSubmit() {
      this.$refs.form
        .validate()
        .then(() => {
          console.log('form', this.form)
        })
        .catch(console.log)
    }
  }
}
</script>

<style lang="less" scoped>
.com-page {
  padding-top: 20px;
  padding-left: 20px;
}
</style>
