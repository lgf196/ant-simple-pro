import React,{lazy} from 'react'
import { Modal, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { requestCode } from './varbile'
import { PlusCircleTwoTone, MinusCircleTwoTone } from "@ant-design/icons";

/**
 * @author lgf
 * @description  message.success组件二次封装
 * @param {requestCode} status
 * @param {String} content
 */
export const toast = (status = requestCode.successCode, content = '操作成功') => {
  if (status === requestCode.successCode) {
    message.success(content);
  } else if (status === requestCode.failedCode) {
    message.error(content);
  }
}

/**
 * @author lgf
 * @description 对 Modal.confirm组件进行二次封装
 * @param {Function} func
 * @param {String} content
 * @param {Function} onCancel
 */
export const confirm = (func, content = '确定要删除吗？', onCancel) => {
  Modal.confirm({
    title: '提示',
    content,
    okText: '确认',
    centered: true,
    icon: <ExclamationCircleOutlined />,
    cancelText: '取消',
    onOk: async () => {
      func && func();
    },
    onCancel() {
      onCancel && onCancel();
    },
  });
}

/**
 *
 * @param {any} param0
 * @param {string} flag
 * @returns {React.ReactNode} 返回一个新的元素
 */
export const expandIcon = ({ expanded, onExpand, record },flag) =>{
  const style = {
    textAlign: 'center',
    position: 'absolute',
    top: '65%',
    transform: 'translateY(-50%)',
    height: '40px',
    width:'40px'
  }
  return (
    record[flag] && record[flag].length ? expanded ? (
    <div style={style}><MinusCircleTwoTone onClick={e => onExpand(record, e)} /></div>
  ) : (
    <div style={style}><PlusCircleTwoTone onClick={e => onExpand(record, e)} /></div>
  ) : null)
}

/**
 * @author lgf
 * @description 匀速动画算法
 * @param {Number} t
 * @param {Number} b
 * @param {Number} c
 * @param {Number} d
 */
export const easeInOutCubic = (t, b, c, d) => {
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
export const backTopAnimate = (target = document.documentElement || document.body, duration = 450) => {
  const scrollTop = target.scrollTop;
  const startTime = Date.now();
  const frameFunc = () => {
    const timestamp = Date.now();
    const time = timestamp - startTime;
    const nextScrollTop = Math.ceil(easeInOutCubic(time > duration ? duration : time, scrollTop, 0, duration));
    target.scrollTop = nextScrollTop;
    // console.log('nextScrollTop', nextScrollTop)
    time < duration && window.requestAnimationFrame(frameFunc);
  }
  window.requestAnimationFrame(frameFunc);
}

/**
 * @author lgf
 * @param {Function} fn
 * @param {Number} wait
 * @param  {...any} args
 * @returns {Function} 函数
 */
export const delay = (fn,wait,...args) => setTimeout(fn,wait,...args);

/**
 * @author lgf
 * @description 多个函数执行队列
 * @param  {...any} funcs
 * @returns Function
 */
export const quenue= (...funcs)=>{
  return funcs.reduce((curr,prev)=>{
    return async (...args)=>{await prev(await curr(...args))
  }})
}

/**
 * @author lgf
 * @param {String} path
 * @returns {()=>Promise} 返回一个promise异步函数
 */
export const lazyComponent= (path)=> {
  return lazy(() => import(/* webpackChunkName: '[request]' */`@/pages/${path}`))
}
