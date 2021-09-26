import React from 'react'
import { Spin } from 'antd'
import { SpinProps } from 'antd/lib/spin'
const RouterLoading: React.FC<SpinProps> = (props) => (
  <div style={{ paddingTop: 100, textAlign: 'center' }}>
    <Spin size="large" {...props}/>
  </div>
)
export default RouterLoading
