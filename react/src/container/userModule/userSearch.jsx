import React, { memo } from 'react'
import { Form } from 'antd';
import Buttons from '@/components/button';
import Inputs from '@/components/input';

const UserSearch = memo(function UserSearch({ setUsername }) {
  const [form] = Form.useForm();

  const handleSubmit = (values) => setUsername(values.username ? values.username : undefined);

  return (
    <>
      <Form layout="inline" form={form} name="form" onFinish={handleSubmit}>
        <Form.Item label="名称" name='username'>
          <Inputs size='middle' />
        </Form.Item>
        <Form.Item>
          <Buttons title='查询' htmlType="submit" />
          <Buttons title='重置' onClick={() => [form.resetFields(), setUsername(form.resetFields())]} type='default' className='left-10px' />
        </Form.Item>
      </Form>
    </>
  )
})

export default UserSearch;
