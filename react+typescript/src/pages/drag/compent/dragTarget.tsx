import React, { memo, FC } from 'react'
import { useDrag } from 'react-dnd';
import SvgIcon from '@/components/svgIcon'
import style from './index.module.scss'
import { tempalteType } from '@/pages/drag/baseCompents/template'

const DragTarget: FC<{
  itemValue: tempalteType
}> = memo(function DragTarget({ itemValue }) {

  const [, drager] = useDrag({
    type: "Box",
    item: itemValue
  });

  return (
    <div ref={drager} className={style.drapTarget}>
      <SvgIcon iconClass={itemValue.type} className='svg-style' />
      <p>{itemValue.title}</p>
    </div>
  )
})

export default DragTarget
