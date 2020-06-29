import React, { memo } from 'react'
import { Table } from 'antd';
import {TableProps} from 'antd/lib/table/Table'

const TableCompent:React.FC<TableProps<any>> = memo(function TableCompent({columns,dataSource,loading=true,rowSelection}) {
    return (
        <>
             <Table
                style={{background:'#fff'}}
                columns={columns}
                dataSource={dataSource}
                pagination={false}
                rowKey='id'
                bordered
                rowSelection={rowSelection}
                loading={loading}
            />
        </>
    )
})
export default TableCompent
