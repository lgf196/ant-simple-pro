import React, { memo,useCallback } from 'react'
import PageLayout from '@/layouts/pageLayout'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import { Col, Row } from 'antd';

const Index = memo(function Index() {

  const addEmoji = useCallback((val)=>{
    console.log(`输出的结果===>>`, val)
  })

  const I18nConfig = {
    search: '搜索',
    clear: '清除', // Accessible label on "clear" button
    notfound: '没有找到表情',
    skintext: '选择默认肤色',
    categories: {
      search: '搜索结果',
      recent: '经常使用',
      smileys: '笑脸与情感',
      people: '人与身体',
      nature: '动物与自然',
      foods: '食物和饮料',
      activity: '活动',
      places: '旅游与地方',
      objects: '对象',
      symbols: '符号',
      flags: '标志',
      custom: '风俗',
    },
    categorieslabel: '表情符号类别',
    skintones: {
      1: 'Default Skin Tone',
      2: 'Light Skin Tone',
      3: 'Medium-Light Skin Tone',
      4: 'Medium Skin Tone',
      5: 'Medium-Dark Skin Tone',
      6: 'Dark Skin Tone',
    },
  }

  return (
    <PageLayout>
      <Row>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <h2 style={{fontSize:'20px',marginBottom:"10px"}} >中文版：</h2>
          <Picker onSelect={addEmoji} i18n={ I18nConfig } />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <h2 style={{fontSize:'20px',marginBottom:"10px"}} >英文版：</h2>
          <Picker title='选择' emoji='point_up' />
        </Col>
      </Row>
    </PageLayout>
  )
})
export default Index
