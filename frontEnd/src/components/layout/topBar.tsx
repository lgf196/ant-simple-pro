import React, { memo,useState} from 'react'
import {Tooltip,Dropdown,Menu } from 'antd'
import {Link } from "react-router-dom"
import {MenuFoldOutlined,MenuUnfoldOutlined,FullscreenOutlined,CaretDownOutlined } from  '@ant-design/icons';
import {layoutProps} from '@/interfaces'
import {FullScreeOut} from '@/components/layout/layoutTable'
import './topBar.scss'
type topbarProps={onToggle:Function} & layoutProps;
const TopBar:React.FC<topbarProps> = memo(function TopBar({collapsed,onToggle}) {
    const [fullscreen,setFullscreen]=useState<boolean>(false);
    const  handleFullScreen=()=> {   // 全屏事件
            let element = document.documentElement;
            if (fullscreen) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            } else {
                if (element.requestFullscreen) {
                    element.requestFullscreen();
                } else if (element.webkitRequestFullScreen) {
                    element.webkitRequestFullScreen();
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if (element.msRequestFullscreen) {
                    // IE11
                    element.msRequestFullscreen();
                }
            }
            setFullscreen(!fullscreen);
    }
    const  dropdown=()=>(
                    <Menu>
                        <Menu.Item key="0">
                        <Link to="/user/info">个人信息</Link>
                        </Menu.Item>
                        <Menu.Item key="1">
                        <Link to="/user/changePassword">密码</Link>
                        </Menu.Item>
                        <Menu.Divider />
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
                <div>
                    {/* <Tooltip title={fullscreen?'取消':'全屏'}  placement="bottom">
                        <FullscreenOutlined  onClick={handleFullScreen} className='icon'/>
                    </Tooltip> */}
                    <FullScreeOut className='icon'/>
                </div>
                    <Dropdown overlay={dropdown} placement="bottomCenter">
                        <div className='propsUser'>
                            <CaretDownOutlined />
                            <span>LGF-VIEW</span>
                        </div>
                    </Dropdown>
                </div>
        </div>
    )
})

export default TopBar
