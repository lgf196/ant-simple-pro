import React, { memo,useState } from 'react'
import Popus from './compent/popus'
import TopAd from './compent/topAd'
import PageLayout from '@/layouts/pageLayout'
import { Button,Divider  } from 'antd';

const Index = memo(function Index() {

  const [popusVisible,setPopusVisible] = useState(true);

  const popusConfig = {
    visible:popusVisible,
    close:setPopusVisible,
    imageUrl:'https://antd-simple-pro.oss-cn-beijing.aliyuncs.com/image/1619162519739.png',
    linkUrl:'https://github.com/lgf196/ant-simple-pro'
  }

  const topconfig = {
    imageUrl:'http://img30.360buyimg.com/pop/jfs/t1/167699/3/19263/31070/607cfaf8Ed0016163/86edcf393b26d657.jpg.webp',
    linkUrl:'https://github.com/lgf196/ant-simple-pro',
    bg:'rgb(200, 32, 32)'
  }

  return (
    <PageLayout>
      <Divider>顶部广告栏</Divider>
      <TopAd {...topconfig} />
      <Divider />
      <Button type="primary" onClick={()=>setPopusVisible(true)}>弹窗广告栏</Button>
      <Popus {...popusConfig}/>
    </PageLayout>
  )
})

export default Index;
