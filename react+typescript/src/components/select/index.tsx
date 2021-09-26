import React, { memo } from 'react'
import { Select } from 'antd';
import { SelectProps, SelectValue } from 'antd/lib/select'
const { Option } = Select;

interface SelectsType extends SelectProps<any> {
  data: any[];
  valKey: string;
  valName: string
}

const Selects: React.FC<SelectsType> = memo(function Selects({ data, valKey, valName, onChange, value, ...props }) {
  const handleCurrencyChange = (currency: SelectValue, option: any) => {
    onChange && onChange(currency, option);
  };

  return (
    <>
      <Select {...props} placeholder='请选择' onChange={handleCurrencyChange} value={value} showSearch
        allowClear={true} filterOption={(input, option: any) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      >
        {
          data.map((item, index) => (
            <Option value={item[valKey]} key={index}>{item[valName]}</Option>)
          )
        }
      </Select>
    </>
  )
})

export default Selects
