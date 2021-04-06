import React, { memo,useEffect } from 'react'
import QRCode from 'qrcode.react';
import PageLayout from '@/layouts/pageLayout'
import { Form, InputNumber , Button, Row,Col,Switch } from 'antd';
import InputCompent from '@/components/input';
import { useSetState } from '@/hooks'

const Index = memo(function Index() {

  const [form] = Form.useForm();

  const defalutVal = {
    linkUrl:'https://lgf196.top/react/home',
    size:200,
    logoUrl:"https://antd-simple-pro.oss-cn-beijing.aliyuncs.com/image/1617703002435.png",
    logoW:70,
    logoH:70,
    excavate:false
  };
  const [config,setConfig] = useSetState(defalutVal);

  useEffect(() => {
    form.setFieldsValue(defalutVal)
  }, [])

  const onFinish = (values) => {
    setConfig(values);
  };

  return (
    <PageLayout>
       <Row gutter={[10, 10]}>
        <Col xs={24} sm={24} md={12} lg={5} xl={5}>
          <QRCode
            id="qrCode"
            value={config.linkUrl}
            size={config.size} // 二维码的大小
            fgColor="#000000" // 二维码的颜色
            style={{ margin: 'auto' }}
            imageSettings={{ // 二维码中间的logo图片
              src: config.logoUrl,
              height: config.logoH,
              width: config.logoW,
              excavate:config.excavate
            }}
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={19} xl={19}>
          <Form form={form} labelAlign='left' onFinish={onFinish}>
            <Form.Item label="链接url" name="linkUrl" rules={[{ required: true, message: '请填写' }]}>
              <InputCompent size='middle' />
            </Form.Item>
            <Form.Item label="二维码大小" name="size" rules={[{ required: true, message: '请填写' }]}>
              <InputNumber min={50}/>
            </Form.Item>
            <Form.Item label="中间logo图url" name="logoUrl">
              <InputCompent size='middle' />
            </Form.Item>
            <Form.Item label="logon宽" name="logoW" >
              <InputNumber min={10}/>
            </Form.Item>
            <Form.Item label="logon高" name="logoH">
              <InputNumber min={10}/>
            </Form.Item>
            <Form.Item label="logo是否镂空" name="excavate" valuePropName="checked">
              <Switch checkedChildren="是" unCheckedChildren="否" />
            </Form.Item>
            <Form.Item >
              <Button type="primary" htmlType="submit">
                生产二维码
              </Button>
            </Form.Item>
          </Form>
        </Col>
       </Row>
    </PageLayout>
  )
})

export default Index;
