import React, { memo } from 'react'
import { Menu } from 'antd';
import { Link,withRouter,RouteComponentProps} from 'react-router-dom'
import IconComponent from '@/components/icon'
import {SAGA_GETMENUTREE} from '@/redux/constants/sagaType'
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {menuAccessType} from '@/interfaces'
import './slideNav.scss'
export interface SlideNavProps {
   dispatch:Dispatch,
   getMenuTree:menuAccessType[]
}
 
export interface SlideNavState {
    openKeys:string[];
}
 
class SlideNav extends React.Component<SlideNavProps, SlideNavState> {
    constructor(props: SlideNavProps) {
        super(props);
        this.state = {
            openKeys: [],
        };
    }
    componentDidMount(){
       this.props.dispatch({type:SAGA_GETMENUTREE})
    }
    componentDidUpdate(){
        console.log('this.props', this.props)
    }
    rednerMenu = (getMenuTree:menuAccessType[]) => { 
        const { SubMenu } = Menu;
        return getMenuTree.map((item)=>{
            if(!item.children){
                return (<Menu.Item key={item.id} icon={<IconComponent name={item.icon}/>}><Link to={item.url}>{item.title}</Link></Menu.Item>);
            }else{
                 return (
                    <SubMenu key={item.id} icon={<IconComponent name={item.icon}/>} title={item.title}>
                       {this.rednerMenu(item.children)}
                    </SubMenu>
                 )
            }
        })
    }
    onOpenChange = (openKeys: any[]) => {
        const rootSubmenuKeys=this.props.getMenuTree.map(item=>item.id);
        const latestOpenKey = openKeys.find((key: string) => this.state.openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(Number(latestOpenKey)) === -1) {
          this.setState({ openKeys });
        } else {
          this.setState({
            openKeys: latestOpenKey ? [latestOpenKey] : [],
          });
        }
    };
    render() { 
        const {getMenuTree} =this.props;
        return (  
            <div  className='siderbar' style={{width:'200px'}}>
                <div className="logo-wrapper" style={{fontSize:'24px'}}>
                    <Link to="/home" style={{color:'#65CEA7'}}>LGF-View</Link>
                </div>  
                <Menu mode="inline" openKeys={this.state.openKeys} onOpenChange={this.onOpenChange}  className='menu'>
                    {this.rednerMenu(getMenuTree)}
                </Menu>
            </div>
        );
    }
}
 
export default connect(({user}:reduceStoreType)=>({
    getMenuTree:user.getMenuTree
}))(SlideNav);

