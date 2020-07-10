import React, { memo } from 'react'
import SliderNav from './slideNav';
import Tag from './tag';
import TobBar from './topBar';
import './index.scss'

const Layout:React.FC = memo(function Layout(props) {
    return (
        <div className='layout' style={{left:'200px'}}>
            <SliderNav></SliderNav>
            <Tag></Tag>
            <TobBar></TobBar>
            <div className="content-wrapper">
                {props.children}
            </div>
        </div>
    )
})

export default Layout
