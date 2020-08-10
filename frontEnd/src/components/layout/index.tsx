import React, { memo,useState } from 'react'
import SliderNav from './slideNav';
import Tag from './tag';
import TobBar from './topBar';
import { renderRoutes ,RouteConfig,matchRoutes} from 'react-router-config'
import './index.scss'

const Layout:React.FC = memo(function Layout({route}:RouteConfig) {
    const [collapsed,setCollapsed]=useState<boolean>(false);
    let  routeArr= matchRoutes(route.routes,window.location.pathname)[0].route; //取出当前的路由信息
    const topBarProps=()=>({
        collapsed,
        onToggle:()=>setCollapsed(!collapsed)
    })
    return (
        <div className='layout' style={{left:'200px'}}>
            <SliderNav collapsed={collapsed}></SliderNav>
            <TobBar {...topBarProps()}></TobBar>
            <Tag collapsed={collapsed}  route={routeArr}></Tag>
            <div className="content-wrapper" style={{left:collapsed?'50px':'200px'}}>
                {renderRoutes(route.routes)}
            </div>
        </div>
    )
})

export default Layout
