import React, { memo } from 'react'
import { Pagination } from 'antd';
import {PaginationProps} from 'antd/lib/pagination/Pagination'
import {animateStop} from '@/utils/function'
interface PagationType extends PaginationProps{
    onChanges:Function
}
const Pagation:React.FC<PagationType> = memo(function Pagation({total=0,onChanges,...props}) {
    const Change=(page: number, pageSize?: number | undefined)=>{
        onChanges(page, pageSize);
        animateStop();
    }
    return (
        <>
            {total?<Pagination {...props} showSizeChanger showQuickJumper  total={total}  showTotal={total => `共 ${total} 页`}  
             onChange={Change} onShowSizeChange={Change} pageSizeOptions={['20','50','100','200']} 
             defaultPageSize={20} style={{marginTop:'20px'}} defaultCurrent={1}/>:null}
        </>
    )
})

export default Pagation
