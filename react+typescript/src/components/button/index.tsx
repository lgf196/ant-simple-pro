import React, { memo } from 'react'
import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button/button'
import SvgIcon, { svgProps } from '@/components/svgIcon'

export type buttonProps = ButtonProps & { title?: string } & Partial<svgProps>;

const Buttons: React.FC<buttonProps> = memo(function Buttons({ fontSize, title, iconClass, fill, ...props }) {
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
