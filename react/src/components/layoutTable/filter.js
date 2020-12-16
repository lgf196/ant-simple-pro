import React, { memo } from 'react'
import { FilterOutlined } from '@ant-design/icons';
import { Tooltip, Popover, Checkbox } from 'antd'

const Filter = memo(function Filter({ tablecolumns, filterColunsFunc, className }) {
  const onChange = (checkedValue) => {
    const filterColunsData = tablecolumns.filter((item) => checkedValue.includes(item.key));
    filterColunsFunc(filterColunsData)
  }

  const filterComponent = (
    <>
      <Checkbox.Group onChange={onChange} defaultValue={tablecolumns.map((item) => item.key)}>
        <ul>
          {
            tablecolumns.length ? tablecolumns.map((item, index) => (
              <li key={index}><Checkbox value={item.key}><span style={{ paddingLeft: '6px' }}>{item.title}</span></Checkbox></li>
            )) : null
          }
        </ul>
      </Checkbox.Group>
    </>
  );

  return (
    <>
      <Popover placement="bottom" content={filterComponent}>
        <Tooltip title='过滤' placement="left">
          <FilterOutlined className={className} />
        </Tooltip>
      </Popover>
    </>
  )
})

export default Filter;
