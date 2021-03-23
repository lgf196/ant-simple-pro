import React, { memo } from 'react'
import { Table } from 'antd';

const TableCompent = memo(function TableCompent({ columns, id='id',dataSource, loading = true, rowSelection, bordered = false, ...props }) {
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
