import React from "react";
import {layoutProps,tagPropsType} from '@/interfaces'
import { NavLink ,RouteComponentProps,withRouter} from 'react-router-dom'
import './tag.scss'
export interface TagProps extends layoutProps {
    
}
 
export interface TagState{
    tagsList:tagPropsType[]
}
 
class Tag extends React.Component<TagProps, TagState> {
    constructor(props: TagProps) {
        super(props);
        this.state = { tagsList:[{name:'系统首页',path: "/home",title: "系统首页"}] };
    }
    render() { 
        const {collapsed} = this.props;
        const {tagsList}=this.state;
        return ( 
            <div className='tag-wrapper' style={{left:collapsed?'50px':'200px'}}>
                <ul className="tags"> 
                    {
                        tagsList.map((item,index)=>{
                            return (
                                <li  key={index}>
                                    <NavLink to={item.path}  className='tags-li-title'>
                                        {item.title}
                                    </NavLink>
                                </li> 
                            )
                        })
                    }  
                 </ul>
            </div>
         );
    }
}
export default Tag;