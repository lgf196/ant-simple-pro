import React, { memo } from 'react'
import { Pagination } from 'antd';
import { PaginationProps } from 'antd/lib/pagination/Pagination'
import { backTopAnimate } from '@/utils/function'
interface PagationType extends PaginationProps {
  onChanges?: Function
}

const Pagation: React.FC<PagationType> = memo(function Pagation({ pageSizeOptions, defaultPageSize, total = 0, onChanges, ...props }) {
  const Change = (page: number, pageSize?: number | undefined) => {
    onChanges && onChanges(page, pageSize);
    backTopAnimate(document.querySelector('#content')!);
  }

  return (
    <>
      {total ? <Pagination {...props} showSizeChanger showQuickJumper total={total} showTotal={total => `共 ${total} 页`}
        onChange={Change} onShowSizeChange={Change} pageSizeOptions={pageSizeOptions}
        defaultPageSize={defaultPageSize} style={{ marginTop: '20px' }} defaultCurrent={1} /> : null}
    </>
  )
})
Pagation.defaultProps = {
  defaultPageSize: 20,
  pageSizeOptions: ['20', '50', '100', '200']
}

export default Pagation
