import React, { memo, useMemo } from 'react'
import Icon from '@ant-design/icons';

const SvgIcon = memo(function SvgIcon({ iconClass, fill, fontSize, className, ...props }) {
  const iconName = useMemo(() => ("#icon-" + iconClass), [iconClass]);
  return (
    <Icon {...props} component={() => (<svg style={{ ...svgStyle, fontSize }} aria-hidden="true" className={className}>
      <use xlinkHref={iconName} fill={fill} /></svg>)}>
    </Icon>
  )
})

const svgStyle = {
  width: '1em',
  height: '1em',
  verticalAlign: '-0.15em',
  overflow: 'hidden',
  fill: 'currentColor', // 颜色值
  fontSize: '1.1em'
}

export default SvgIcon;
