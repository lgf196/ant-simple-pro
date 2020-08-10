import React, { memo,useState } from 'react'
import SliderNav from './slideNav';
import Tag from './tag';
import TobBar from './topBar';
import './index.scss'

const Layout:React.FC = memo(function Layout(props) {
    const [collapsed,setCollapsed]=useState<boolean>(false);
    const topBarProps=()=>({
        collapsed,
        onToggle:()=>setCollapsed(!collapsed)
    })
    return (
        <div className='layout' style={{left:'200px'}}>
            <SliderNav collapsed={collapsed}></SliderNav>
            <TobBar {...topBarProps()}></TobBar>
            <Tag collapsed={collapsed}></Tag>
            <div className="content-wrapper" style={{left:collapsed?'50px':'200px'}}>
                {props.children}
            </div>
        </div>
    )
})

export default Layout
