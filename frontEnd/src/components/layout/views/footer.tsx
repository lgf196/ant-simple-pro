import React, { memo } from 'react'
import style from './footer.module.scss'
const Footer = memo(function Footer(props) {
    return (
        <div className={style.footer}>
           <p>Ant Simple Pro</p>
           <p>Copyright © 2020 Lgf&qyh</p>
        </div>
    )
})

export default Footer

