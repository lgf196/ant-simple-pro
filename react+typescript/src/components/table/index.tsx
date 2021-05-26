import React, { memo } from 'react'
import { Table } from 'antd';
import { TableProps } from 'antd/lib/table/Table'

const TableCompent: React.FC<TableProps<any>> = memo(function TableCompent({ id='id',columns, dataSource, loading = true, rowSelection, bordered = false, ...props }) {
  return (
    <>
      <Table
        style={{ background: '#fff' }}
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        rowKey={id}
        bordered={bordered}
        rowSelection={rowSelection}
        loading={loading}
        {...props}
      />
    </>
  )
})

export default TableCompent
