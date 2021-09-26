import React, { memo, useEffect, useMemo } from 'react'
import { Dropdown, Menu, Spin, Tooltip, Button } from 'antd'
import { Link } from "react-router-dom"
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, LogoutOutlined,QuestionCircleOutlined, DownOutlined } from '@ant-design/icons';
import { layoutProps } from '@/interfaces'
import { FullScreeOut } from '@/components/layoutTable'
import { useDispatch, useSelector } from 'react-redux';
import { SAGA_GET_USER_INFO } from '@/redux/constants/sagaType'
import HeadImage from '@/components/headImage'
import style from './head.module.scss'
import { responsiveConfig } from '@/utils/varbile'
import { MenuInfo } from 'rc-menu/lib/interface';
import { confirm } from '@/utils/function'
import { useHistory } from "react-router-dom";
import { localStorage } from '@/assets/js/storage'
import { createSelector } from 'reselect'
import News from './new'

export type topbarProps = { onToggle: Function } & layoutProps;

const TopBar: React.FC<topbarProps> = memo(function TopBar({ collapsed, onToggle, width, setIsMobileDrawer }) {
  const moreList = [
    {title:'ant-simple-pro(vue3.0)',url:'https://lgf196.top/vue/'},
    {title:'ant-simple-pro(afterEnd)',url:'https://github.com/lgf196/ant-simple-pro/tree/afterEnd'},
    {title:'ant-simple-pro(angular)',url:'https://github.com/lgf196/ant-simple-pro/tree/angular/angular'},
  ];

  const history = useHistory();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: SAGA_GET_USER_INFO });
  }, [dispatch]);

  const selectNumOfDoneTodos = createSelector(
    [(state: reduceStoreType) => state.user.getUserInfo, (state: reduceStoreType) => state.user.loadingUserInfo],
    (getUserInfo, loadingUserInfo) => [getUserInfo, loadingUserInfo] as const
  );

  const [getUserInfo, loadingUserInfo] = useSelector(selectNumOfDoneTodos);

  const isMobileDevice = useMemo(() => width! < responsiveConfig.mobileInnerWidth ? true : false, [width]);

  const tagOption = ({ key }: MenuInfo) => {
    if (key === '2') {
      confirm(() => {
        localStorage.clear();
        history.push(`/login?rp=${+new Date()}`);
      }, '确定要退出登录吗？');
    }
  }

  const dropdown = () => (
    <Menu onClick={tagOption}>
      <Menu.Item key='1'>
        <Link to="/userInfo">
          <UserOutlined />
          <span>个人信息</span>
        </Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key='2'>
        <LogoutOutlined />
        <span>退出登录</span>
      </Menu.Item>
    </Menu>
  );

  const more= () => (
    <Menu>
      {
        moreList.map((item,index)=>(
          <Menu.Item key={index}>
            <a href={item.url} target='_blank'>
              <span>{item.title}</span>
            </a>
          </Menu.Item>
        ))
      }
    </Menu>
  );

  const options = () => {
    setIsMobileDrawer!(isMobileDevice);
    onToggle(!collapsed);
  }

  return (
    <div className={`${style.head} clearfix`}>
      <div className={`${style.headLeft} fl`}>
        <div className={`${style.menu}`} onClick={options}>
          {collapsed ? <MenuUnfoldOutlined className={style.icon} /> : <MenuFoldOutlined className='icon' />}
        </div>
      </div>
      <div className={`${style.menuList} fr`}>
       <a href="http://blog.lgf196.top/ant-simple-pro-document/" target='_blank'>
          <Tooltip title="文档">
            <QuestionCircleOutlined className={style.icon} />
          </Tooltip>
        </a>
        <News />
        <FullScreeOut className={style.icon} />
        <Dropdown overlay={dropdown} placement="bottomCenter">
          <div className={`${style.propsUser}`}>
            {
              loadingUserInfo ? <>
                <HeadImage url={getUserInfo.iconUrl} />
                <span>{getUserInfo.username ? getUserInfo.username : '珍珍'}</span>
              </> : <Spin size="small" />
            }
          </div>
        </Dropdown>
        <Dropdown overlay={more} placement="bottomRight">
          <Button size='small' style={{marginLeft:'20px',color:"rgba(105, 123, 140, 0.7)"}}>
            <span>更多</span>
            <DownOutlined />
          </Button>
        </Dropdown>
      </div>
    </div>
  )
})

export default TopBar;

