import React, { memo } from 'react'

const Nodata: React.FC<{ data: string | null }> = memo(function Nodata({ data }) {
  return (
    <>
      { data ? <span>{data}</span> : <span>/</span>}
    </>
  )
})
export default Nodata
