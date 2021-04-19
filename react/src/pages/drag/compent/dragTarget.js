import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { useDrag } from 'react-dnd';
import SvgIcon from '@/components/svgIcon'
import style from './index.module.scss'

const DragTarget = memo(function DragTarget({itemValue}) {

  const [, drager] = useDrag({
      type:"Box",
      item:itemValue
  });

  return (
      <div ref={ drager } className={style.drapTarget}>
        <SvgIcon iconClass={itemValue.type} className='svg-style' />
        <p>{itemValue.title}</p>
      </div>
  )
})

DragTarget.propTypes = {

}

export default DragTarget
