import React, { memo } from 'react'
import { Input } from 'antd';

const Inputs = memo(function Inputs({ onChange, placeholder, size, value, ...props }) {
  const handleCurrencyChange = (currency) => {
    onChange && onChange(currency);
  };
  return (
    <>
      <Input {...props} placeholder={placeholder} onChange={handleCurrencyChange}
        value={value} allowClear={true} size={size} />
    </>
  )
})

Inputs.defaultProps = {
  placeholder: '请填写',
  size: 'large',
}

export default Inputs
