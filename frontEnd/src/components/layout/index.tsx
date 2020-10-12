import React, { memo,useState,useEffect } from 'react'
import SliderNav from './slideNav';
import Tag from './tag';
import TobBar from './topBar';
import { renderRoutes ,RouteConfig,matchRoutes} from 'react-router-config'
import {useOnResize} from '@/hooks'
import {Head,SlideNav} from '@/components/layout/views'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { Drawer } from 'antd';
import style from './index.module.scss'
const Layout:React.FC = memo(function Layout({route,location}:RouteConfig) {
    const [collapsed,setCollapsed]=useState<boolean>(false);
    const [isMobileStatus,setIsMobileStatus]=useState<boolean>(false); //用来控制是否到了手机端的尺寸
    const {width}=useOnResize();
    console.log('width', width)
    let  routeArr= matchRoutes(route.routes,location!.pathname)[0].route; //取出当前的路由信息
    const topBarProps=()=>({
        collapsed,
        onToggle:(collapsed:boolean)=>setCollapsed(collapsed)
    })
    useEffect(() => {
        setCollapsed(width<1200?true:false);
    }, [width]); 
    return (
        <div className='layouts'>
            {/* <SliderNav collapsed={collapsed}></SliderNav> */}
            <Head {...topBarProps()} width={width} setIsMobileDrawer={setIsMobileStatus}></Head>
            {
                width<750?<Drawer bodyStyle={{padding:'0'}} placement='left' closable={false} 
                visible={isMobileStatus} width={200} onClose={()=>[setIsMobileStatus(false),setCollapsed(true)]}>
                    <SlideNav collapsed={collapsed}/>
                </Drawer>: <SlideNav collapsed={collapsed}/>
            }
            {/* <Tag collapsed={collapsed}  route={routeArr}></Tag> */}
            <div className={style.contentWrapper} style={{left:collapsed?width<750&&!isMobileStatus?'0':'80px':'200px'}}>
                {/* <TransitionGroup style={{height:'100%'}}>
                    <CSSTransition
                        key={location!.pathname}
                        timeout={{ enter: 300, exit: 0 }}
                        classNames="fade"
                        unmountOnExit
                        > */}
                        <div className={style.content}>{renderRoutes(route.routes,{},{location})}</div>
                    {/* </CSSTransition>
                </TransitionGroup> */}
            </div>
        </div>
    )
})
export default Layout
