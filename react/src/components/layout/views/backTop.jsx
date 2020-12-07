import React, { memo } from 'react'
import { BackTop } from 'antd';
import { VerticalAlignTopOutlined } from '@ant-design/icons';
import style from './backTop.module.scss'

const BackTopCompent = memo(function BackTopCompent({ element, ...props }) {
  return (
    <BackTop {...props} target={() => document.querySelector(element)} style={{ right: '30px', bottom: '30px' }}>
      <div className={style.backTop}>
        <VerticalAlignTopOutlined />
      </div>
    </BackTop>
  )
})

export default BackTopCompent
