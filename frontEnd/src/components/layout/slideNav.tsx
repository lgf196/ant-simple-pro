import React, { memo } from 'react'
import { Menu } from 'antd';
import { Link,withRouter,RouteComponentProps} from 'react-router-dom'
import IconComponent from '@/components/icon'
import './slideNav.scss'
type menuDataType={
    id:number;
    title:string;
    icon:string;
    url:string;
    children?:menuDataType[]
}
export interface SlideNavProps {
    
}
 
export interface SlideNavState {
    openKeys:string[];
    list:menuDataType[]
}
 
class SlideNav extends React.Component<SlideNavProps, SlideNavState> {
    rootSubmenuKeys: number[];
    constructor(props: SlideNavProps) {
        super(props);
        this.state = {
            openKeys: [],
            list:[
                {id:1,title:'111',icon:'icon-el-zitixiabiao',url:'',children:[{id:11,title:'11-11',icon:'',url:''}]},
                {id:2,title:'22',icon:'icon-el-zitixiabiao',url:'',children:[{id:22,title:'22-11',icon:'',url:''}]},
                {id:4,title:'44',icon:'icon-el-zitixiabiao',url:'',children:[{id:44,title:'44-11',icon:'',url:''}]},
                {id:5,title:'55',icon:'icon-el-zitixiabiao',url:'',children:[{id:55,title:'55-11',icon:'',url:''}]},
                {id:6,title:'66',icon:'icon-el-zitixiabiao',url:'',children:[{id:55,title:'55-11',icon:'',url:''}]},
                {id:7,title:'77',icon:'icon-el-zitixiabiao',url:'',children:[{id:55,title:'55-11',icon:'',url:''}]},
                {id:8,title:'88',icon:'icon-el-zitixiabiao',url:'',children:[{id:55,title:'55-11',icon:'',url:''}]},
                {id:3,title:'33',icon:'icon-el-zitixiabiao',url:''},
        ]
        };
        this.rootSubmenuKeys=[1,2,3,4,5,6,7,8];
    }
    rednerMenu = (getMenuTree:menuDataType[]) => { 
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
        const latestOpenKey = openKeys.find((key: string) => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(Number(latestOpenKey)) === -1) {
          this.setState({ openKeys });
        } else {
          this.setState({
            openKeys: latestOpenKey ? [latestOpenKey] : [],
          });
        }
    };
    render() { 
        return (  
            <div  className='siderbar' style={{width:'200px'}}>
                <div className="logo-wrapper" style={{fontSize:'24px'}}>
                    <Link to="/home" style={{color:'#65CEA7'}}>LGF-View</Link>
                </div>  
                <Menu mode="inline" openKeys={this.state.openKeys} onOpenChange={this.onOpenChange}  className='menu'>
                    {this.rednerMenu(this.state.list)}
                </Menu>
            </div>
        );
    }
}
 
export default SlideNav;

