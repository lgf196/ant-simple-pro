import React from 'react'
import { Form, Button } from 'antd';
import InputComponent from '@/components/input'
import './login.scss'
const Login:React.FC=()=>{
      const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
      };
      const onFinish = (values:any) => {
        console.log('Success:', values);
      }
    return (
        <>
          <div className="form"  >
                <div className="form-inner">
                    <h2>欢迎来到;lgf-web</h2>
                    <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    layout='vertical'
                    >
                    <Form.Item
                        label="用户名"
                        name="username"
                        rules={[{ required: true, message: '请输入用户名' }]}
                    >
                        <InputComponent />
                    </Form.Item>
                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[{ required: true, message: '请输入密码' }]}
                    >
                        <InputComponent type='password' />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                        登录
                        </Button>
                    </Form.Item>
                    </Form>
                </div>
            </div>
        </>
    )
}
export default Login;