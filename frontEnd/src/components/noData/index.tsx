import React, { memo } from 'react'

const Nodata:React.FC<{data:string}> = memo(function Nodata({data}) {
    return (
        <>
            { data.length?<span>{data}</span>:<span>/</span> }
        </>
    )
})
export default Nodata
