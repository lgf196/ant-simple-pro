import React from 'react'
import { Spin } from 'antd'

const RouterLoading = ({tip}) => (
  <div style={{ paddingTop: 100, textAlign: 'center'}}>
    <Spin size="large" tip={tip}/>
  </div>
)

RouterLoading.defaultProps = {
  tip: '',
}

export default RouterLoading
