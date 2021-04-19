import React, { memo,useState,useMemo } from 'react'
import PageLayout from '@/layouts/pageLayout'
import { Button,Row,Col,Radio } from 'antd';
import { saveAs } from 'file-saver';
import QRCode from 'qrcode.react';
import { defalutVal } from '@/pages/qrCode'

const styel = {
  border:'1px solid #f0f0f0',
  padding:'10px',
  textAlign:"center",
  height:'320px'
}

const Index = memo(function Index(props) {

  const [value, setValue] = useState(1);

  const imageUrl = 'http://blog.lgf196.top/ant-simple-pro-document/logon.png';

  const text = '简洁，美观，快速上手，支持3大框架，typescript；Concise, beautiful, quick to get started, support 3 big frameworks';

  const fileType = useMemo(()=>{
    let type = null;
    if(value === 1){
      type = 'antSimplePro.txt';
    }else if(value === 2){
      type = 'antSimplePro.html';
    }else{
      type = 'antSimplePro.xlsx';
    }
    return type;
  },[value]);

  const downFile = (status)=>{
    if(status === 1){
       saveAs(imageUrl,'ant-simple-pro.png');
    }else if(status === 2){
      const canvasImg = document.getElementById('qrCode');
      canvasImg.setAttribute('crossorigin', 'Anonymous');
      canvasImg.toBlob(function(blob) {
        saveAs(blob, "ant-simple-pro.png");
      });
    }else{
      /*
       blod格式也是可以的,如下，具体请参考https://github.com/eligrey/FileSaver.js
       const blob = new Blob([text], {type: "text/plain;charset=utf-8"});
       saveAs(blob, fileType);
      */
       const file = new File([text],fileType, {type: "text/plain;charset=utf-8"});
       saveAs(file);
    }
  }

  const onChange = e => setValue(e.target.value);

  return (
    <PageLayout>
      <Row gutter={[10, 10]}>
        <Col xs={24} sm={24} md={12} lg={8} xl={8}>
          <div style={styel}>
            <h4 className='top-10px'>图片下载</h4>
            <img src={imageUrl} alt=""/>
            <p className='bottom-10px'></p>
            <Button type="primary" onClick={()=>downFile(1)}>保存</Button>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={8}>
          <div style={styel}>
            <h4 className='top-10px'>canvas下载</h4>
            <QRCode
              id="qrCode"
              value={defalutVal.linkUrl}
              size={defalutVal.size} // 二维码的大小
              fgColor="#000000" // 二维码的颜色
              style={{ margin: 'auto' }}
              imageSettings={{ // 二维码中间的logo图片
                src: defalutVal.logoUrl,
                height: defalutVal.logoH,
                width: defalutVal.logoW,
              }}
              />
               <p className='bottom-10px'></p>
            <Button type="primary" onClick={()=>downFile(2)}>保存</Button>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={8}>
          <div style={styel}>
            <h4 className='top-10px'>文件下载</h4>
            <p>{text}</p>
            <p className='padding-10px'>下载格式类型</p>
            <Radio.Group onChange={onChange} value={value}>
              <Radio value={1}>txt格式</Radio>
              <Radio value={2}>html格式</Radio>
              <Radio value={3}>xlsx格式</Radio>
            </Radio.Group>
            <p className='bottom-10px'></p>
            <Button type="primary" onClick={()=>downFile(3)}>保存</Button>
          </div>
        </Col>
      </Row>
    </PageLayout>
  )
})

export default Index;
