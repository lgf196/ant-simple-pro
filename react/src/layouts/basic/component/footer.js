import React, { memo } from 'react'
import style from './footer.module.scss'
import SvgIcon from '@/components/svgIcon'
import Line from '@/components/line'

const Footer = memo(function Footer({ svgName, iconComponent, name, ahthor, className }) {
  return (
    <div className={`${style.footer} ${className}`}>
      <div className={style.logon}>
        {iconComponent ? iconComponent : <SvgIcon iconClass={svgName} />}
        <Line />
        <span>{name}</span>
      </div>
      <p>Copyright © {new Date().getFullYear()} {ahthor}</p>
    </div>
  )
})

Footer.defaultProps = {
  svgName: 'logon'
}

export default Footer

