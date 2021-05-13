import React, { useEffect } from 'react';
import { Form, Input, Button, Row } from 'antd';
import BraftEditor from './compent/braft';
import PageLayout from '@/layouts/pageLayout';

const FormItem = Form.Item;

export default function Braft() {
  const [form] = Form.useForm();

  useEffect(() => {
    const timer = setTimeout(() => {
      form.setFieldsValue({
        content: '<p>Hello <b>Braft!</b></p>',
      });
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [form]);

  const onFinish = (values) => {
    const result = {
      title: values.title,
      content: values.content.toHTML(),
    };
    console.log(result);
  };
  return (
    <PageLayout>
      <Form form={form} onFinish={onFinish}>
        <FormItem
          name="title"
          label="文章标题"
          rules={[{ required: true, message: '请输入标题' }]}
        >
          <Input
            placeholder="请输入标题"
            maxLength={20}
            style={{ width: '300px' }}
            autoComplete="off"
          />
        </FormItem>
        <FormItem
          name="content"
          label="文章正文"
          trigger="onBlur"
          validateTrigger="onBlur"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <BraftEditor className="border" placeholder="请输入正文内容" />
        </FormItem>
        <FormItem>
          <Row>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Row>
        </FormItem>
      </Form>
    </PageLayout>
  );
}
