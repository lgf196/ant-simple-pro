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
import './topBar.scss'
export type topbarProps={onToggle:Function,getUserInfo:getUserType,dispatch:Dispatch} & layoutProps;
const TopBar:React.FC<topbarProps> = memo(function TopBar({collapsed,onToggle,getUserInfo,dispatch}) {
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
                    </Menu>)
    return (
            <div className='topbar-wrapper clearfix' style={{left:collapsed?'80px':'200px'}}>
                <div className="menu-collapse-wrapper fl"  onClick={()=>onToggle()}>
                    <Tooltip title={collapsed?'张开':'缩起'}  placement="bottom">
                        {collapsed ?<MenuUnfoldOutlined  className='icon'/>:<MenuFoldOutlined className='icon'/>}
                    </Tooltip>
                </div>
                <div className="title fl">LGF-VIEW -管理系统</div>
                <div className='menu-list fr'>
                    <FullScreeOut className='icon'/>
                    <Dropdown overlay={dropdown} placement="bottomCenter">
                        <div className='propsUser'>
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

