import React, { memo } from 'react'
import { Result, Button } from 'antd';

const PageError = memo(function PageError() {

  const backs = ()=>{
    window.location.href = '/react/home' // 强制刷新跳转
  }

  return (
       <Result
        status="500"
        title="500"
        subTitle="sorry,页面出错了，请点击下面返回按钮，再试一次"
        extra={<Button type="primary" onClick={backs} >
         返回主页
      </Button>}
    />
  )
})

export default PageError;
