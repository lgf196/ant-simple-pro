import React, { memo,FC } from 'react'
import style from './describle.module.scss'
import Line from '@/components/line'

export interface lengedNameType {
  title:string;
  color:string;
  onClick:React.MouseEventHandler;
  value:number
}

const LengedName:FC<lengedNameType> = memo(function LengedName({title,color,onClick,value}) {
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

export default LengedName;
