import React, { memo } from 'react'
import { Button } from 'antd';
import {ButtonProps} from 'antd/lib/button/button'
const Buttons:React.FC<ButtonProps> = memo(function Buttons({type,size,style,onClick,htmlType,loading,ghost,icon,title,danger}) {
    return (
        <>
            <Button type={type} size={size} style={style} onClick={onClick} htmlType={htmlType} loading={loading} ghost={ghost} danger={danger}>
                <i className={`iconfont ${icon}`}></i>
                {title}
            </Button>
        </>
    )
})
Buttons.defaultProps={
    type:'primary',
    loading:false,
    ghost:false,
    icon:'',
    danger:false
}
export default Buttons
