import React from 'react'
import { Form, Button, Input } from 'antd';
import { login } from '@/api/login'
import { useHistory } from "react-router-dom";
import { requestCode } from '@/utils/varbile'
import { useSelector } from 'react-redux';
import SvgIcon from '@/components/svgIcon'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Footer } from '@/layouts/basic/component'
import style from './login.module.scss'
import logon from '@/assets/image/pic.svg'

const Login = () => {
  const history = useHistory();

  const loading = useSelector(({ other }) => other.loading);

  const onFinish = async (values) => {
    const { email, password } = values
    let res = await login({ email, password });
    if (res.code === requestCode.successCode) {
      localStorage.setItem('token', res.data);
      history.push("/home");
    }
  };

  return (
    <div className={style.login}>
      <div className={style.content}>
        <div className={style.bg}>
          <img src={logon} alt="logon" />
        </div>
        <div className={style.fill}>
          <div className={style.logon}>
            <SvgIcon iconClass='logon' fontSize='30px' className={style.img} />
            <h2>Ant Simple Pro</h2>
          </div>
          <div className={style.from}>
            <Form name="basic" initialValues={{ remember: true }} layout='vertical' onFinish={onFinish}>
              <Form.Item name="email" rules={[{ required: true, message: '请输入邮箱' }]}>
                <Input
                  prefix={<UserOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />}
                  placeholder="请填写邮箱"
                  size='large'
                  allowClear
                />
              </Form.Item>
              <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
                <Input
                  prefix={<LockOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />}
                  type="password"
                  placeholder="请填写密码"
                  size='large'
                  allowClear
                />
              </Form.Item>
              <Form.Item className={style.space}>
                <Button type="primary" htmlType="submit"
                  loading={loading}
                  className={style.submit}
                  size='large'
                >
                  登录
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
      <Footer name='Ant Simple Pro' ahthor='Lgf&qyh' />
    </div>
  )
}

export default Login;

