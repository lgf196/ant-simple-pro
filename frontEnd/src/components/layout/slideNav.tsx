import React from 'react'
import { Menu, Layout} from 'antd';
import { Link,withRouter,RouteComponentProps} from 'react-router-dom'
import IconComponent from '@/components/icon'
import {SAGA_GETMENUTREE} from '@/redux/constants/sagaType'
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {menuAccessType,layoutProps} from '@/interfaces'
import {Location,UnregisterCallback} from 'history'
import './slideNav.scss'
export interface SlideNavProps extends layoutProps,RouteComponentProps{
   dispatch:Dispatch,
   getMenuTree:menuAccessType[],
}
 
export interface SlideNavState extends layoutProps{
    openKeys:string[];
    lastOpenKeys:string[];
}
 
class SlideNav extends React.Component<SlideNavProps, SlideNavState> {
    unlisten!: UnregisterCallback;
    constructor(props: SlideNavProps) {
        super(props);
        this.state = {
            openKeys: [],
            lastOpenKeys: [],
            collapsed:false
        };
    }
   componentWillUnmount(){
        this.unlisten(); //取消监听
    }
    componentDidMount(){
        this.unlisten = this.props.history.listen((location:Location) => {  //这样可以监听全局路由的变化
            this.defaultOpenUrl(location.pathname);
        });
       this.props.dispatch({type:SAGA_GETMENUTREE});
       this.defaultOpenUrl(this.props.location.pathname);
    }
    rednerMenu = (getMenuTree:menuAccessType[]) => { 
        const { SubMenu } = Menu;
        return getMenuTree.map((item)=>{
            if(!item.children){
                return (<Menu.Item key={item.url} icon={<IconComponent name={item.icon}/>}><Link to={item.url}>{item.title}</Link></Menu.Item>);
            }else{
                 return (
                    <SubMenu key={item.url} icon={<IconComponent name={item.icon}/>} title={item.title}>
                       {this.rednerMenu(item.children)}
                    </SubMenu>
                 )
            }
        })
    }
    /**
     * 
     * @issue  菜单折叠后，子菜单不消失的 问题，和闪烁的问题
     * @cause  菜单折叠后，openKeys 并没有清空
     * @address https://github.com/ant-design/ant-design/issues/14536
     * @borrow  https://github.com/qyhever/e-admin-react/blob/master/src/layouts/Sidebar.js 
     */
    static getDerivedStateFromProps(props:SlideNavProps, state:SlideNavState) {
        if (props.collapsed !== state.collapsed) {
          if (props.collapsed) {
            state.lastOpenKeys = state.openKeys
            return {
              collapsed: props.collapsed,
              openKeys: []
            }
          }
          return {
            collapsed: props.collapsed,
            openKeys: state.lastOpenKeys
          }
        }
        return null
    }
    onOpenChange = (openKeys: string[]) => {
        const rootSubmenuKeys=this.props.getMenuTree.map(item=>item.url);
        const latestOpenKey = openKeys.find((key: string) => this.state.openKeys.indexOf(key) === -1)!;
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
          this.setState({ openKeys });
        } else {
          this.setState({
            openKeys: latestOpenKey ? [latestOpenKey] : [],
          });
        }
    };
    defaultOpenUrl=(url:string)=>{ //获取当前页的路劲，防止刷新看不到选中的样式
        let openKeys:string[]=[],arrUrl:string[]=[];
        arrUrl=url.split('/'); arrUrl.splice(0,1);
        if(arrUrl.length<=2){
            openKeys.push(`/${arrUrl[0]}`)
        }else{  //如果有超过2层的，就执行
            let str='',newArr:string[]=[];
            arrUrl.forEach((item,index)=>{
                if(index<=arrUrl.length-2){ //不计算最后一个
                    str+=`/${item}`;
                    newArr.push(str);
                }
            })
            openKeys.push(...newArr)
        }
          this.setState({openKeys});
    }
    render() { 
        const { Sider} = Layout;
        const {getMenuTree,collapsed,location} =this.props;
        const {openKeys}=this.state;
        const defaultProps = collapsed ? {} : { openKeys }; 
        const defaultSelectedKeys=location.pathname;
        return (  
            <Sider trigger={null} collapsible collapsed={collapsed}   width={200}>
                <div  className='siderbar' style={{width:collapsed?'50px':'200px'}}>
                    <div className="logo-wrapper" style={{fontSize:collapsed?'16px':'24px'}}>
                        <Link to="/home" style={{color:'#65CEA7'}}>LGF</Link>
                    </div>  
                    <Menu mode="inline" 
                    openKeys={openKeys} 
                    onOpenChange={this.onOpenChange} 
                    defaultSelectedKeys={[defaultSelectedKeys]}
                     selectedKeys={[defaultSelectedKeys]}
                    {...defaultProps}
                    className='menu'>
                        {this.rednerMenu(getMenuTree)}
                    </Menu>
                </div>
            </Sider>
        );
    }
}
 
export default withRouter(connect(({user}:reduceStoreType)=>({
    getMenuTree:user.getMenuTree
}))(SlideNav));


