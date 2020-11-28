import React, { memo } from 'react'
import { BackTop } from 'antd';
import { VerticalAlignTopOutlined } from '@ant-design/icons';
import style from './backTop.module.scss'
import { BackTopProps } from 'antd/lib/back-top';
interface backTopProps extends BackTopProps {
  element: string,
}

const BackTopCompent: React.FC<backTopProps> = memo(function BackTopCompent({ element, ...props }) {
  return (
    <BackTop {...props} target={() => document.querySelector(element) as HTMLElement} style={{ right: '30px', bottom: '30px' }}>
      <div className={style.backTop}>
        <VerticalAlignTopOutlined />
      </div>
    </BackTop>
  )
})

export default BackTopCompent
