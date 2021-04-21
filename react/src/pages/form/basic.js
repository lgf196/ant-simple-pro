import React, { memo, useEffect } from 'react'
import { Form, Input, Button, Checkbox, DatePicker, Radio } from 'antd';
import Select from '@/components/select'
import InputCompent from '@/components/input';
import ImgUpload from '@/components/upload/imgUpload'
import moment from 'moment';
import { requestCode } from '@/utils/varbile';

const FormCompent = memo(function FormCompent(props) {
  const onFinish = (values) => {
    const rangeValue = values['date'];

    const val = Object.assign({}, values, {
      date: [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')],
    });

    console.log('Success:', val);
  };
  const layout = {
    labelCol: {
      xl: { span: 2 },
      lg: { span: 2 },
    },
    wrapperCol: {
      xl: { span: 9 },
      lg: { span: 9 },
    },
  };

  const { RangePicker } = DatePicker;

  const { TextArea } = Input;

  const [form] = Form.useForm();

  const selectList = [
    { name: 'react', id: 1 },
    { name: 'vue', id: 2 },
    { name: 'angular', id: 3 },
    { name: 'webpack', id: 4 },
    { name: 'docker', id: 5 },
    { name: 'node', id: 6 },
    { name: 'typescript', id: 7 },
    { name: 'qiankun', id: 8 },
  ];

  const hobbyOptions = [
    { label: '篮球', value: 1 },
    { label: '乒乓球', value: 2 },
    { label: '羽毛球', value: 3 },
    { label: '游泳', value: 4 },
    { label: '跑步', value: 5 },
  ];

  const sexList = [
    { label: '男', value: 1 },
    { label: '女', value: 2 },
  ];

  useEffect(() => {
    form.setFieldsValue({
      username: '枫叶',
      nickname: '帅锋锋',
      sex: 2,
      remember: true,
      hobby: [2, 4, 5],
      date: [moment('2020-09-03'), moment('2020-11-22')],
      skill: [1, 7, 8, 6],
      photo: [{
        uid: '-1',
        status: 'success',
        response: {
          code: requestCode.successCode,
          data: { url: 'https://antd-simple-pro.oss-cn-beijing.aliyuncs.com/image/1618975957299.jpg' },
        },
        url: 'https://antd-simple-pro.oss-cn-beijing.aliyuncs.com/image/1618975957299.jpg',
      },]
    });
  }, []);

  return (
    <div className='bgW padding-10px'>
      <Form {...layout} form={form} labelAlign='left' onFinish={onFinish}>
        <Form.Item label="姓名" name="username" rules={[{ required: true, message: '请填写' }]}>
          <InputCompent size='middle' />
        </Form.Item>
        <Form.Item label="外号" name="nickname" rules={[{ required: true, message: '请填写' }]}>
          <InputCompent size='middle' />
        </Form.Item>
        <Form.Item label="性别" name="sex">
          <Radio.Group options={sexList} />
        </Form.Item>
        <Form.Item label="爱好" name="hobby">
          <Checkbox.Group options={hobbyOptions} />
        </Form.Item>
        <Form.Item label="日期" name="date" rules={[{ type: 'array', required: true, message: '请选择日期' }]}>
          <RangePicker />
        </Form.Item>
        <Form.Item label="技术栈" name="skill">
          <Select mode="multiple" data={selectList} valName='name' valKey='id' />
        </Form.Item>
        <Form.Item label="照片" name="photo" valuePropName="fileList">
          <ImgUpload />
        </Form.Item>
        <Form.Item label="描述" name="description">
          <TextArea autoSize={{ minRows: 2 }} placeholder='请输入' />
        </Form.Item>
        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>记住</Checkbox>
        </Form.Item>
        <Form.Item >
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
})

export default FormCompent;
