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

export const easeInOutCubic=(t: number, b: number, c: number, d: number)=> {
    const cc = c - b;
    t /= d / 2;
    if (t < 1) {
      return (cc / 2) * t * t * t + b;
    }
    return (cc / 2) * ((t -= 2) * t * t + 2) + b;
}

/**
 * 
 * @param target    |  @description 滚动事件的元素
 * @param duration  |  @description 回到顶部所需时间（ms）
 */
export const backTopAnimate=(target: Element=document.documentElement || document.body,duration:number=450)=>{
    const scrollTop=target.scrollTop;
    const startTime = Date.now();
    const frameFunc=()=>{
        const timestamp = Date.now();
        const time = timestamp - startTime;
        const nextScrollTop =Math.ceil(easeInOutCubic(time > duration ? duration : time, scrollTop, 0, duration));
        target.scrollTop=nextScrollTop;
        // console.log('nextScrollTop', nextScrollTop)
        time < duration && window.requestAnimationFrame(frameFunc);
    }
    window.requestAnimationFrame(frameFunc);
}