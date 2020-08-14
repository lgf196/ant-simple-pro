import React from "react";
import {layoutProps,tagPropsType} from '@/interfaces'
import { NavLink ,RouteComponentProps,withRouter} from 'react-router-dom'
import {matchRoutes,RouteConfig } from 'react-router-config'
import {CloseOutlined,LoadingOutlined} from  '@ant-design/icons'
import './tag.scss'
export interface TagProps extends layoutProps,RouteComponentProps {
    route:RouteConfig
}
 
export interface TagState{
    tagsList:tagPropsType[]
}
 
class Tag extends React.Component<TagProps, TagState> {
    constructor(props: TagProps) {
        super(props);
        this.state = { tagsList:[{name:'系统首页',path: "/home",title: "系统首页"}] };
    }
    componentDidUpdate(prevProps:TagProps){ //如果props改变就调用
        const {location,route,history} =this.props;
        if(location.pathname!=prevProps.location.pathname){
          try {
              this.setTags(this.filterRouters(route,location))
          }catch (error) {
             history.push('/404');
          }  
        }
    }
    filterRouters=(route:RouteConfig,location:any):tagPropsType=>{
        let arr=null;
         if(route.routes){
            arr=matchRoutes(route.routes,location.pathname)[0].route;
            if(arr.routes){
              arr=this.filterRouters(arr,location);
            }
         }else{
             arr=route;
         }
         return arr as tagPropsType;
    }
    setTags=(route:tagPropsType)=>{  //生成动态的路由tag
        const isExist = this.state.tagsList.some(item => {
            return item.path === route.path;
        })
        if(!isExist){
            if(this.state.tagsList.length >= 8){
                this.state.tagsList.shift();
            }
            if(route.path=='*' || route.path=='/404'){
                this.setState((state)=>({tagsList:[{name:'404',path: "/404",title: "404"}]}));
                return false;
            }
            this.setState((state)=>({tagsList:[...state.tagsList,{name:route.title,path:route.path,title:route.title}]}))
        }
    } 
    closeTags(index: number,path: string,e: { stopPropagation: () => void }){ //删除标签
        e.stopPropagation();
        this.setState((state)=>({
            tagsList:state.tagsList.filter((item,i)=>i!=index)
        }),()=>{
            const item = this.state.tagsList[index] ? this.state.tagsList[index] : this.state.tagsList[index - 1];
            if (item) {
                path === this.props.location.pathname && this.props.history.push(item.path);
            }else{
                this.props.history.push('/home');
            }
        })
    }
    render() { 
        const {collapsed,location} = this.props;
        const {tagsList}=this.state;
        return ( 
            <div className='tag-wrapper' style={{left:collapsed?'50px':'200px'}}>
                <ul className="tags"> 
                    {
                        tagsList.map((item,index)=>{
                            return (
                                <li className={item.path ===location.pathname?'tags-li selected':'tags-li'} key={index}>
                                    <NavLink to={item.path}  className='tags-li-title' title={item.title}>
                                        {item.title}
                                    </NavLink>
                                    {
                                        this.state.tagsList.length>1 && <CloseOutlined  className='del' onClick={(e) => this.closeTags(index,item.path, e)}/>
                                    }
                                </li> 
                            )
                        })
                    }  
                 </ul>
            </div>
         );
    }
}
export default withRouter(Tag);