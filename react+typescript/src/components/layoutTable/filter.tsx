import React, { memo } from 'react'
import { FilterOutlined } from '@ant-design/icons';
import { Tooltip, Popover, Checkbox } from 'antd'
import { ColumnsType } from 'antd/lib/table';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';

export type FilterProps = {
  tablecolumns: ColumnsType<any>;
  filterColunsFunc: Function;
  className?: string
}

const Filter: React.FC<FilterProps> = memo(function Filter({ tablecolumns, filterColunsFunc, className }) {
  const onChange = (checkedValue: Array<CheckboxValueType>) => {
    const filterColunsData = tablecolumns.filter((item) => checkedValue.includes(item.key as string));
    filterColunsFunc(filterColunsData)
  }

  const filterComponent = (
    <>
      <Checkbox.Group onChange={onChange} defaultValue={(tablecolumns as { key: CheckboxValueType }[]).map((item) => item.key)}>
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

export default Filter
