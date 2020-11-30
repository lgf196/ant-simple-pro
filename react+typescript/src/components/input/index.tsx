import React, { memo } from 'react'
import { Input } from 'antd';
import { InputProps } from 'antd/lib/input/Input'
interface InputsType extends InputProps {

}

const Inputs: React.FC<InputsType> = memo(function Inputs({ onChange, placeholder, size, value, ...props }) {
  const handleCurrencyChange = (currency: React.ChangeEvent<HTMLInputElement>) => {
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
