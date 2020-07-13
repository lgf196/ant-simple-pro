import React, { memo } from 'react'
import './topBar.scss'
const TopBar = memo(function TopBar(props) {
    return (
            <div className='topbar-wrapper clearfix' style={{left:'200px'}}>
                <div className="menu-collapse-wrapper fl" >
                  
                </div>
                 <div className="title fl">LGF-VIEW -管理系统</div>
                <div className='menu-list fr'>
                    
                </div>
        </div>
    )
})

export default TopBar
