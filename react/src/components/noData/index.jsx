import React, { memo } from 'react'

const Nodata = memo(function Nodata({ data }) {
  return (
    <>
      { data ? <span>{data}</span> : <span>/</span>}
    </>
  )
})
export default Nodata;
