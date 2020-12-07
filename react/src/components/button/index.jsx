import React, { memo } from 'react'
import { Button } from 'antd';
import SvgIcon from '@/components/svgIcon'

const Buttons = memo(function Buttons({ fontSize, title, iconClass, fill, ...props }) {
  return (
    <>
      <Button {...props}>
        {iconClass ? <SvgIcon iconClass={iconClass} fill={fill} fontSize={fontSize} /> : null}
        <span>{title}</span>
      </Button>
    </>
  )
})

Buttons.defaultProps = {
  type: 'primary',
  fill: '#fff',
  fontSize: '18px'
}

export default Buttons
