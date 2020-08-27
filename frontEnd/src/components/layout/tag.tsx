import React from "react";
import {layoutProps,tagPropsType} from '@/interfaces'
import { NavLink ,RouteComponentProps,withRouter} from 'react-router-dom'
import {matchRoutes,RouteConfig } from 'react-router-config'
import {CloseOutlined} from  '@ant-design/icons'
import {Location} from 'history'
import './tag.scss'
import { Divider } from "antd";
export interface TagProps extends layoutProps,RouteComponentProps {
    route:RouteConfig
}
 
export interface TagState{
    tagsList:tagPropsType[]
}
 /**
  * @note 该组件，我做的复杂了，同学们可以不需要用react-router-config中的route来获取title和path,
  *       如果将slideruNav组件中的路由信息写到link组件中的to属性（用对象形式传递title，path等）
  *       那么filterRouters函数就是无用的，并且也就不需要react-router-config中的route了，同学们可以将slideNav
  *       路由变化信息存储到redux中，在componentDidUpdate函数中就可以监听路由变化，重而实现数据共享和最终实现tag组件的功能。
  *       
  */
class Tag extends React.Component<TagProps, TagState> {
    constructor(props: TagProps) {
        super(props);
        this.state = { tagsList:[
             {name:props.location.state as string,path:props.location.pathname,title:props.location.state as string}
        ]};
    }
    componentDidUpdate(prevProps:TagProps){ //如果props改变就调用
        const {location,route,history} =this.props;
        if(location.pathname!=prevProps.location.pathname){
          try {
              this.setTags(this.filterRouters(route,location),location)
          }catch (error) {
             history.push('/404');
          }  
        }
    }
    filterRouters=(route:RouteConfig,location:Location):tagPropsType=>{
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
    setTags=(route:tagPropsType,location:Location)=>{  //生成动态的路由tag
        const isExist = this.state.tagsList.some(item => {
            return item.path === route.path;
        })
        if(!isExist){
            if(this.state.tagsList.length >= 8){
                this.state.tagsList.shift();
            }
            if(route.path=='*' || route.path=='/404'){
                this.setState((state)=>({tagsList:[]}));
                return false;
            }
            this.setState((state)=>({tagsList:[...state.tagsList,{name:(location.state as string),path:route.path,title:(location.state as string)}]}))
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
                
                   <div className='tag-wrapper' style={{left:collapsed?'80px':'200px'}}>
                       {
                           tagsList.length? (<ul className="tags"> 
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
                          </ul>):<p className="tags">未匹配到相关的路径~</p>
                       }
                       
                    </div>        
                
         );
    }
}
export default withRouter(Tag);