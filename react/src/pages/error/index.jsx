import React, { memo } from 'react'
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom'
import '@/assets/scss/common.scss'
const Error = memo(function Error() {
  return (
    <div className='Error404'>
      <Result
        status="404"
        title="404"
        subTitle="sorry，没有找到相关的页面。"
        extra={<Button type="primary">
          <Link to='/home'>返回主页</Link>
        </Button>}
      />
    </div>
  )
})

export default Error;
