import React from 'react'
import { Modal,message } from 'antd';
import {ExclamationCircleOutlined} from '@ant-design/icons';
import {requestCode} from './varbile'
import {statusCode} from '@/interfaces'

export const toast=(status:statusCode=requestCode.successCode,content:string='操作成功'):void=>{
    if(status==requestCode.successCode){
        message.success(content);
    }else if(status==requestCode.failedCode){
        message.error(content);
    }
}

export const confirm=(func:Function,content:string='确定要删除吗？',onCancel?:Function):void=>{
    Modal.confirm({
        title: '提示',
        content,
        okText: '确认',
        centered: true,
        icon: <ExclamationCircleOutlined/>,
        cancelText:'取消',
        onOk:async ()=> { 
            func && func();
        },
        onCancel() {
            onCancel && onCancel();
        },
    }); 
}

export const animateStop=()=>{
    let scrollTop,spend,times,ele=document.querySelector('.content')!; //父元素不是document是这个标签,用！表示绝对有scrollTop属性
    scrollTop=ele.scrollTop ;
    spend=scrollTop/3;
    ele.scrollTop-= Math.ceil(spend);
    times=setTimeout(() => {
       animateStop();
    },10);
    scrollTop<5&&clearTimeout(times);
}