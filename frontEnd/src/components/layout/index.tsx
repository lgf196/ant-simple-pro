import React, { memo,useState,useEffect } from 'react'
import { renderRoutes ,RouteConfig,matchRoutes} from 'react-router-config'
import {useOnResize} from '@/hooks'
import {Head,SlideNav,Tag,Footer,BackTop} from '@/components/layout/views'
import { Drawer} from 'antd';
import style from './index.module.scss'
import  {responsiveConfig} from '@/utils/varbile'
import 'src/assets/scss/common.scss'
const Layout:React.FC = memo(function Layout({route,location}:RouteConfig) {

    const [collapsed,setCollapsed]=useState<boolean>(false);

    const [isMobileStatus,setIsMobileStatus]=useState<boolean>(false); //用来控制是否到了手机端的尺寸

    const {width}=useOnResize();

    let  routeArr= matchRoutes(route.routes,location!.pathname)[0].route; //取出当前的路由信息

    const topBarProps=()=>({
        collapsed,
        onToggle:(collapsed:boolean)=>setCollapsed(collapsed)
    })

    useEffect(() => {
        setCollapsed(width<responsiveConfig.collapsedInnerWidth?true:false);
    }, [width]); 

    return (
        <div className={style.layouts}>
            <Head {...topBarProps()} width={width} setIsMobileDrawer={setIsMobileStatus}></Head>
            {
                width<responsiveConfig.mobileInnerWidth?<Drawer bodyStyle={{padding:'0'}} placement='left' closable={false} 
                visible={isMobileStatus} width={responsiveConfig.sliderExpansionLeft} onClose={()=>[setIsMobileStatus(false),setCollapsed(true)]}>
                    <SlideNav collapsed={collapsed}/>
                </Drawer>: <SlideNav collapsed={collapsed}/>
            }
            <div className={style.contentWrapper} 
               style={{left:collapsed?width<responsiveConfig.mobileInnerWidth&&!isMobileStatus?`${responsiveConfig.sliderMobileLeft}`:`${responsiveConfig.sliderPackUpLeft}px`:`${responsiveConfig.sliderExpansionLeft}px`}}>
                        <Tag collapsed={collapsed}  route={routeArr}/>
                        <div className={style.content} id='content'>
                            <div className={style.pageContent}>{renderRoutes(route.routes,{},{location})}</div>
                            <Footer name='Ant Simple Pro' ahthor='Lgf&qyh'/>
                        </div>
            </div>
             <BackTop element='#content'/>
        </div>
    )
})

export default Layout
