import React, { memo } from 'react'
import { Button } from 'antd';
import {ButtonProps} from 'antd/lib/button/button'
import SvgIcon,{svgProps} from '@/components/svgIcon'
export type buttonProps=ButtonProps & {title:string} & svgProps;
const Buttons:React.FC<buttonProps> = memo(function Buttons({title,iconClass,fill,...props}) {
    return (
        <>
            <Button {...props}>
                {iconClass? <SvgIcon iconClass={iconClass} fill={fill} />:null}
                <span style={{paddingLeft:'3px'}}>{title}</span>
            </Button>
        </>
    )
})
Buttons.defaultProps={
    type:'primary',
    fill:'#fff'
}
export default Buttons
