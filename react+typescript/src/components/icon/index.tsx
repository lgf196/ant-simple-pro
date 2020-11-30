import React, { memo } from 'react'

const Icon: React.FC<{ name: string }> = memo(function Icon({ name }) {
  return (
    <>
      <i className={`iconfont ${name}`} style={{ paddingRight: '17px', color: '#fff' }}></i>
    </>
  )
})


export default Icon
