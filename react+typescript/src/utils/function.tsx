import React, { lazy } from 'react';
import { Modal, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { requestCode } from './varbile';
import { statusCode } from '@/interfaces';

/**
 * @author lgf
 * @param status 状态
 * @param content 弹窗的文本提示语
 */
export const toast = (
  status: statusCode = requestCode.successCode,
  content: string = '操作成功',
): void => {
  if (status === requestCode.successCode) {
    message.success(content);
  } else if (status === requestCode.failedCode) {
    message.error(content);
  }
};

/**
 * @author lgf
 * @description 对 Modal.confirm组件进行二次封装
 * @param func 要操作的函数
 * @param content 弹窗的文本
 * @param onCancel 取消函数
 */
export const confirm = (
  func: Function,
  content: string = '确定要删除吗？',
  onCancel?: Function,
): void => {
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
};

/**
 * @author lgf
 * @description 匀速动画算法
 */
export const easeInOutCubic = (t: number, b: number, c: number, d: number) => {
  const cc = c - b;
  t /= d / 2;
  if (t < 1) {
    return (cc / 2) * t * t * t + b;
  }
  return (cc / 2) * ((t -= 2) * t * t + 2) + b;
};

/**
 *
 * @param target 滚动事件的元素
 * @param duration 回到顶部所需时间（ms）
 */
export const backTopAnimate = (
  target: Element = document.documentElement || document.body,
  duration: number = 450,
) => {
  const scrollTop = target.scrollTop;
  const startTime = Date.now();
  const frameFunc = () => {
    const timestamp = Date.now();
    const time = timestamp - startTime;
    const nextScrollTop = Math.ceil(
      easeInOutCubic(time > duration ? duration : time, scrollTop, 0, duration),
    );
    target.scrollTop = nextScrollTop;
    // console.log('nextScrollTop', nextScrollTop)
    time < duration && window.requestAnimationFrame(frameFunc);
  };
  window.requestAnimationFrame(frameFunc);
};

/**
 * @description 多个函数执行队列
 * @param funcs 函数名
 */
export const quenue = (...funcs: Function[]) => {
  return funcs.reduce((curr, prev) => {
    return async (...args: any[]) => {
      await prev(await curr(...args));
    };
  });
};

/**
 * @description 异步引入组件
 * @param path 路径
 */
export const lazyComponent = (path: string) => {
  return lazy(() => import(`@/pages/${path}`));
};
