import React, { memo } from 'react'
import Columnar from './components/columnar'
import Bar from './components/bar'
import LineMap from './components/lineMap'
import Pie from './components/pie'
import { Row, Col } from 'antd';
const Chart = memo(function Chart() {
  return (
    <>
      <Row gutter={[10, 10]}>
        <Col xs={24} sm={24} md={24} lg={24} xl={12} >
          <Columnar />
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={12} >
          <Bar />
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={12} >
          <LineMap />
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={12} >
          <Pie />
        </Col>
      </Row>
    </>
  )
})

export default Chart
