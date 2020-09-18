import React, { memo,useState } from 'react'
import SliderNav from './slideNav';
import Tag from './tag';
import TobBar from './topBar';
import { renderRoutes ,RouteConfig,matchRoutes} from 'react-router-config'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import './index.scss'
import '@/assets/scss/common.scss'
const Layout:React.FC = memo(function Layout({route,location}:RouteConfig) {
    const [collapsed,setCollapsed]=useState<boolean>(false);
    let  routeArr= matchRoutes(route.routes,location!.pathname)[0].route; //取出当前的路由信息
    const topBarProps=()=>({
        collapsed,
        onToggle:()=>setCollapsed(!collapsed)
    })
    return (
        <div className='layout'>
            <SliderNav collapsed={collapsed}></SliderNav>
            <TobBar {...topBarProps()}></TobBar>
            <Tag collapsed={collapsed}  route={routeArr}></Tag>
            <div className="content-wrapper" style={{left:collapsed?'80px':'200px'}}>
                {/* <TransitionGroup style={{height:'100%'}}>
                    <CSSTransition
                        key={location!.pathname}
                        timeout={{ enter: 300, exit: 0 }}
                        classNames="fade"
                        unmountOnExit
                        > */}
                        {renderRoutes(route.routes,{},{location})}
                    {/* </CSSTransition>
                </TransitionGroup> */}
            </div>
        </div>
    )
})
export default Layout
