import React, { memo } from 'react'
import DragTarget from './dragTarget';
import DropTarget from './dropTarget';
import style from './index.module.scss'
import BasicTemplate from '@/pages/drag/baseCompents/template'

const Container = memo(function Container(props) {
  return (
    <div className={style.container}>
      <div className={style.sidebar} >
        {
          BasicTemplate.map((item,index)=>(
            <DragTarget itemValue={{...item}} key={index}/>
          ))
        }
      </div>
      <DropTarget/>
    </div>
  )
})

export default Container
