import React, { memo,useEffect } from 'react'
import { Form, Input, Button,Drawer } from 'antd';

const { TextArea } = Input;

const Edit = memo(function Edit({visible,content,callBack}) {

  const [form] = Form.useForm();

  useEffect(() => {
    if(visible){
      form.setFieldsValue(content);
    }
  }, [visible]);

  const onFinish = (values) => {
    callBack({visible:false,content:values});
  };

  const onClose = () => {
    callBack({visible:false});
  };

  return (
    <Drawer
      title="编辑"
      placement="right"
      closable={false}
      onClose={onClose}
      visible={visible}
    >
      <Form  form={form} labelAlign='left' onFinish={onFinish}>
        <Form.Item label="标题" name="title" rules={[{ required: true, message: '请填写' }]}>
          <Input size='middle' />
        </Form.Item>
        <Form.Item label="描述" name="describe">
          <TextArea autoSize={{ minRows: 2 }} placeholder='请输入' />
        </Form.Item>
        <Form.Item >
          <Button type="primary" htmlType="submit">
            修改
          </Button>
      </Form.Item>
      </Form>
    </Drawer>
  )
})

export default Edit;
