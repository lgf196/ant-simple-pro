import React, { memo } from 'react'
import './backTop.scss'

const BackTop:React.FC<{animateType?:string}>= memo(function BackTop({animateType='fadeInUp'}) {
    return (
        <div className={`black animated ${animateType}`} onClick={()=>{}}>
                <i className='iconfont icon-el-fanhuidingbu'></i>
        </div>
    )
})

export default BackTop
