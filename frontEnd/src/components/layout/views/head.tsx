import React, { memo,useEffect} from 'react'
import {Tooltip,Dropdown,Menu } from 'antd'
import {Link } from "react-router-dom"
import {MenuFoldOutlined,MenuUnfoldOutlined} from  '@ant-design/icons';
import {layoutProps,getUserType} from '@/interfaces'
import {FullScreeOut} from '@/components/layout/layoutTable'
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {SAGA_GET_USER_INFO} from '@/redux/constants/sagaType'
import HeadImage from '@/components/headImage'
import style from './head.module.scss'
import  {responsiveConfig} from '@/utils/varbile'
import SvgIcon from '@/components/svgIcon'
export type topbarProps={onToggle:Function,getUserInfo:getUserType,dispatch:Dispatch} & layoutProps;
const TopBar:React.FC<topbarProps> = memo(function TopBar({collapsed,onToggle,getUserInfo,dispatch,width,setIsMobileDrawer}) {
    useEffect(() => {
        dispatch({type:SAGA_GET_USER_INFO});
    }, [dispatch])
    const  dropdown=()=>(
                    <Menu>
                        <Menu.Item key="0">
                        <Link to="/userInfo">个人信息</Link>
                        </Menu.Item>
                        <Menu.Divider/>
                        <Menu.Item key="2">
                            <span>退出登录</span>
                        </Menu.Item>
                    </Menu>);
    const options=()=>{
        setIsMobileDrawer!(width!<responsiveConfig.mobileInnerWidth?true:false);
        onToggle(!collapsed);  
    }
    return (
            <div className={`${style.head} clearfix`}>
                <div className={`${style.headLeft} fl`}>
                    <div className={style.logon}>
                        <Link to="/home">
                            <SvgIcon iconClass='logon' fontSize='30px'/>
                            {
                               !collapsed?<h2>Ant Simple Pro</h2>:null
                            }
                        </Link>
                    </div>
                    <div className={`${style.menu}`}  onClick={options}>
                        {collapsed ?<MenuUnfoldOutlined  className={style.icon}/>:<MenuFoldOutlined className='icon'/>}
                    </div>
                </div>
                <div className={`${style.menuList} fr`}>
                    <FullScreeOut className={style.icon}/>
                    <Dropdown overlay={dropdown} placement="bottomCenter">
                        <div className={`${style.propsUser}`}>
                            <HeadImage url={getUserInfo.iconUrl}/>
                            <span>{getUserInfo.username?getUserInfo.username:'帅锋锋'}</span>
                        </div>
                    </Dropdown>
                </div>
        </div>
    )
})

export default connect(({user}:reduceStoreType)=>({
    getUserInfo:user.getUserInfo
}))(TopBar);

