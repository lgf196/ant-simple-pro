import React, { memo } from 'react'
import {  Select } from 'antd';
import {SelectProps} from 'antd/lib/select'
const { Option } = Select;

interface SelectsType extends SelectProps<any>{
    data:any[];
    valKey:string;
    valName:string
}

const Selects:React.FC<SelectsType> = memo(function Selects({data,valKey,valName,onChange,value,mode,optionFilterProp,style}) {
   const handleCurrencyChange = (currency: any ,option: any)=> {
        onChange &&  onChange(currency,option);
   };
    return (
        <>
              <Select  style={style} placeholder='请选择' size='large'  onChange={handleCurrencyChange} 
               value={value} allowClear={true} mode={mode} optionFilterProp={optionFilterProp}>
                    {
                         data.map((item,index)=>(
                              <Option value={item[valKey]} key={index}>{item[valName]}</Option>)
                         )
                    }
               </Select>
        </>
    )
})


export default Selects
