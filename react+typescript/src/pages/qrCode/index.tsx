import React, { memo,useEffect,useState } from 'react'
import QRCode from 'qrcode.react';
import PageLayout from '@/layouts/pageLayout'
import { Form, InputNumber , Button, Row,Col,Switch } from 'antd';
import InputCompent from '@/components/input';
import { useSetState } from '@/hooks'
import { saveAs } from 'file-saver';
import Logo from '@/assets/image/Icon_512x512-15@1x@1x.png'
import ImgUpload ,{ ImgUploadFile } from '@/components/upload/imgUpload'
import { requestCode } from '@/utils/varbile';

export interface qrcodeType<T=string> {
  linkUrl:string;
  size:number;
  logoUrl:T;
  logoW:number;
  logoH:number;
  excavate:boolean
}

export const defalutVal = {
  linkUrl:'https://lgf196.top/react/home',
  size:200,
  logoUrl:Logo,
  logoW:70,
  logoH:70,
  excavate:false
};

const Index = memo(function Index() {

  const [form] = Form.useForm();

  const [base64Url,setBase64Url] = useState<string>(Logo);

  const [config,setConfig] = useSetState<qrcodeType>(defalutVal);

  useEffect(() => {
    form.setFieldsValue({...defalutVal,logoUrl:[{
      uid: '-1',
      status: 'success',
      response: {
        code: requestCode.successCode,
        data: { url: Logo },
      },
      url:Logo,
    }]})
  }, [])

  const onFinish = (values:qrcodeType<ImgUploadFile[]>) => {
    setConfig(Object.assign({},values,{logoUrl:base64Url}))
  };

  const dowm = ()=>{
    const canvasImg = document.getElementById('qrCode') as HTMLCanvasElement;
    canvasImg!.setAttribute('crossorigin', 'Anonymous');
    canvasImg!.toBlob(function(blob:Blob | null) {
      saveAs(blob as Blob, "ant-simple-pro.png");
    });
  }

  const handleChnage = (val:ImgUploadFile[])=>{
    if(val.length){
      if(val[0].thumbUrl){
        setBase64Url(val[0].thumbUrl ? val[0].thumbUrl : Logo);
        return ;
      }
    }else{
      setBase64Url(Logo);
    }
  }

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
          <Button type="primary" onClick={dowm} style={{marginTop:'10px'}}>下载二维码</Button>
        </Col>
        <Col xs={24} sm={24} md={12} lg={19} xl={19}>
          <Form form={form} labelAlign='left' onFinish={onFinish}>
            <Form.Item label="链接url" name="linkUrl" rules={[{ required: true, message: '请填写' }]}>
              <InputCompent size='middle' />
            </Form.Item>
            <Form.Item label="二维码大小" name="size" rules={[{ required: true, message: '请填写' }]}>
              <InputNumber min={50}/>
            </Form.Item>
            <Form.Item label={(<p>中间logo图url<span style={{color:'red'}}>必须是透明的底</span></p>)} name="logoUrl"  valuePropName="fileList" >
              <ImgUpload limit={1} onChange={handleChnage as any} />
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
