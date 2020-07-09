import React from 'react'
import { Form, Button } from 'antd';
import InputComponent from '@/components/input'
import {login} from '@/api/login'
import { useHistory } from "react-router-dom";
import {requestCode} from '@/utils/varbile'
import './login.scss'
const Login:React.FC=()=>{
    const history=useHistory();
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };
    const onFinish =async (values:any) => {
        const {email,password} = values
        let res=await login({email,password});
        if(res.code===requestCode.successCode){
            localStorage.setItem('token',res.data);
            history.push("/home");
        }
    }
    return (
        <div className='warpLayout'>
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
                        label="邮箱"
                        name="email"
                        rules={[{ required: true, message: '请输入邮箱' }]}
                    >
                        <InputComponent placeholder='请填写邮箱'/>
                    </Form.Item>
                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[{ required: true, message: '请输入密码' }]}
                    >
                        <InputComponent type='password' placeholder='请填写密码'/>
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                        登录
                        </Button>
                    </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
}
export default Login;