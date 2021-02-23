import React, { memo } from 'react'
import PropTypes from 'prop-types'
import style from './describle.module.scss'
import Line from '@/components/line'

const LengedName = memo(function LengedName({title,color,onClick,value}) {
  return (
      <div className={style.lenged} onClick={onClick}>
        <div className={style.line} style={{background:color}}></div>
        <div>{title}</div>
        <Line/>
        <div className={style.price}>{value+'%'}</div>
        <div>¥ {value*130.5}</div>
    </div>
  )
})

LengedName.propTypes = {
  title:PropTypes.string,
  color:PropTypes.string,
  value:PropTypes.number,

}

export default LengedName;
