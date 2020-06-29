import React, { memo } from 'react'
import {  Input } from 'antd';
import {InputProps} from 'antd/lib/input/Input'
interface InputsType extends InputProps{
  
}
const Inputs:React.FC<InputsType> = memo(function Inputs({onChange,placeholder,size,value,type,disabled}) {
  const  handleCurrencyChange = (currency:React.ChangeEvent<HTMLInputElement>) => {
        onChange &&  onChange(currency);
   };
    return (
        <>
             <Input placeholder={placeholder} size={size} onChange={handleCurrencyChange} 
               value={value} type={type}  allowClear={true} disabled={disabled}/>
        </>
    )
})

Inputs.defaultProps={
    placeholder: '请填写',
    size: 'large',
    type: 'text',
    disabled:false,
}

export default Inputs
