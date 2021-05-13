import React, { memo } from 'react'
import PageLayout from '@/layouts/pageLayout'
import ImgCrop from 'antd-img-crop';
import ImgUpload from '@/components/upload/imgUpload'
import 'antd/es/slider/style/index.css';

const Index = memo(function Index(props) {

  return (
    <PageLayout>
      <ImgCrop rotate>
        <ImgUpload typeModule={2} />
      </ImgCrop>
    </PageLayout>
  )
})

export default Index;
