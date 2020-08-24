import React, { memo } from 'react'
import {Tooltip } from 'antd'
import Buttons from '@/components/button'
import '@/assets/scss/common.scss'
import Line from '@/components/line'
import '@/assets/scss/common.scss'
import {LayoutTableProps} from '@/interfaces'
const LayoutTable:React.FC<LayoutTableProps> = memo(function LayoutTable({children,btnGrounp,iconGrounp,tableTitle}) {
    return (
            <div className='layout-table'>
                    <div className='header-option'>
                        <div className='header-option-title'>{tableTitle}</div>
                        <div className='header-option-func'>
                            <div className='option-btn'>
                                {/* <Buttons title='新增'  iconClass='add'/> */}
                                {
                                 btnGrounp?.length? btnGrounp.map((item,index)=>(<Buttons title={item.title} 
                                     iconClass={item.iconClass} key={index} 
                                    onClick={(event)=>item.func?item.func(event):null}/>)):null
                                }
                            </div>
                            <div className='option-icon'>
                               {(btnGrounp?.length && iconGrounp?.length)?<Line/>:null}
                                <div className='icon-grounp'>
                                    {
                                        iconGrounp?iconGrounp.map((item,index)=>(
                                            <div className='update-data' key={index}>
                                                <Tooltip title={item.title}  placement="bottom" >
                                                    <div onClick={(event)=>item.func?item.func(event):null}>{item.icon}</div>
                                                </Tooltip>
                                            </div>
                                        )):null  
                                    }
                                    {/* <div className='update-data'>
                                        <Tooltip title='刷新'  placement="bottom" >
                                            <SyncOutlined />
                                        </Tooltip>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    {children}
            </div>
    )
})
LayoutTable.defaultProps={
    btnGrounp:[],
    iconGrounp:[],
    tableTitle:'查询表格'
}
export default LayoutTable
