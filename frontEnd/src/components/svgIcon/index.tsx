import React, { memo ,useMemo} from 'react'

type svgProps={
    iconClass:string,
    fill?:string,
    fontSize?:string
}
const SvgIcon:React.FC<svgProps>= memo(function SvgIcon({iconClass,fill,fontSize}) {
    const iconName=useMemo(()=>("#icon-" + iconClass),[iconClass]);
    return (
            <svg className='svg-icon' style={{...svgStyle,fontSize}} aria-hidden="true">
                <use xlinkHref={iconName}  fill={fill}/>
            </svg>
    )
})
const svgStyle={
    width: '1em',
    height: '1em',
    verticalAlign: '-0.15em',
    overflow:'hidden'
}

SvgIcon.defaultProps={
    fill: "currentColor",  //颜色值
    fontSize:'1em'         //字体大小
}
export default SvgIcon
