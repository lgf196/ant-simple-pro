import React, { memo,useState } from 'react'
import { SketchPicker,SwatchesPicker,CompactPicker,ChromePicker } from 'react-color'
import { Col, Row } from 'antd';

const Index = memo(function Index() {

  const [color,setColor] = useState('#fff');

  const colorChange = (val) =>{
    setColor(val.hex)
  }

  return (
    <div style={{padding:'20px',background:color}}>
      <Row gutter={[20,20]}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <SketchPicker color={color} onChange ={colorChange} />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <SwatchesPicker color={color} onChange ={colorChange} />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <ChromePicker color={color} onChange ={colorChange} />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <CompactPicker color={color} onChange ={colorChange} />
        </Col>
      </Row>
    </div>
  )
})

export default Index;
