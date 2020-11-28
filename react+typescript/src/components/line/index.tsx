import React, { memo } from 'react'
import lineStyle from './line.module.scss'
const Line: React.FC = memo(function Line() {
  return (
    <>
      <div className={lineStyle.line}></div>
    </>
  )
})


export default Line
