import React from 'react'
import { Menu, Layout,Empty } from 'antd';
import { Link,withRouter,RouteComponentProps} from 'react-router-dom'
import {SAGA_GETMENUTREE} from '@/redux/constants/sagaType'
import { connect } from 'react-redux';
import { Dispatch} from 'redux';
import {menuAccessType,layoutProps} from '@/interfaces'
import {Location,UnregisterCallback} from 'history'
import SvgIcon from '@/components/svgIcon'
import { OpenEventHandler  } from 'rc-menu/lib/interface';
import style from './slideNav.module.scss'
import { backTopAnimate } from '@/utils/function';
import LoadingData from '@/components/routerLoading'
import {composes} from '@/utils/compose'
export interface SlideNavProps extends layoutProps,RouteComponentProps{
   dispatch:Dispatch,
   getMenuTree:menuAccessType[],
   loadingMenuTree:boolean
}
export interface SlideNavState extends layoutProps{
    openKeys:string[];
    lastOpenKeys:string[];
}
class SlideNav extends React.PureComponent<SlideNavProps, SlideNavState> {
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
            backTopAnimate(document.querySelector('#content')!,10);
            this.defaultOpenUrl(location.pathname);
        });

       this.props.dispatch({type:SAGA_GETMENUTREE});
       
       this.defaultOpenUrl(this.props.location.pathname);
    }

    rednerMenu = (getMenuTree:menuAccessType[]) => { 
        const { SubMenu } = Menu;
        return getMenuTree.map((item)=>{
            if(!item.children){
                return (<Menu.Item key={item.url} icon={item.icon?<SvgIcon iconClass={item.icon}  
                    className='svg-style'/>:null}><Link to={{ pathname:item.url,state:item.title}}>{item.title}</Link></Menu.Item>);
            }else{
                 return (
                    <SubMenu key={item.url} icon={item.icon?<SvgIcon iconClass={item.icon}  
                    className='svg-style'/>:null} title={item.title}>
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
            state.lastOpenKeys = state.openKeys;
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
        this.setState({openKeys,lastOpenKeys:openKeys});
    }

    render() { 
        const { Sider} = Layout;
        const {getMenuTree,collapsed,location,loadingMenuTree} =this.props;
        const {openKeys}=this.state;
        const defaultProps = collapsed ? {} : { openKeys }; 
        const defaultSelectedKeys=location.pathname;
        return (  
            <Layout className={style.siderbar}>
                <Sider trigger={null} collapsible collapsed={collapsed}   collapsedWidth={collapsed?80:200}>
                    {
                      loadingMenuTree?
                        (getMenuTree.length?( <Menu mode="inline" 
                        onOpenChange={this.onOpenChange as OpenEventHandler} 
                        defaultSelectedKeys={[defaultSelectedKeys]}
                        selectedKeys={[defaultSelectedKeys]}
                        defaultOpenKeys={openKeys}
                        {...defaultProps}
                        className={style.menu}>
                            {this.rednerMenu(getMenuTree)}
                        </Menu>):<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} className={style.empty}/>): <LoadingData />
                    }
                </Sider>
            </Layout>
        );
    }
}

const enhance=composes(
    withRouter,
    connect(({user}:reduceStoreType)=>({
        getMenuTree:user.getMenuTree,
        loadingMenuTree:user.loadingMenuTree
    }))
)

export default enhance(SlideNav);
