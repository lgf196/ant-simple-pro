import React, { memo,FC } from 'react';
import style from './popus.module.scss';
import { CloseOutlined } from '@ant-design/icons';
import { CSSTransition } from 'react-transition-group';

export type PopusType = {
  visible:boolean,
  close:Function,
  imageUrl:string,
  linkUrl:string
};

const Popus:FC<PopusType> = memo(function Popus({ visible, close,imageUrl,linkUrl }) {
  return (
    <div className={style.popus}>
      <CSSTransition in={visible} classNames="fade" timeout={200} unmountOnExit>
        <div className={style.mask}></div>
      </CSSTransition>
      <CSSTransition in={visible} classNames="alert" timeout={200} unmountOnExit>
        <div className={style.content}>
          <div className={style.box}>
            <CloseOutlined onClick={() => close(false)} className={style.close}/>
            <a href={linkUrl}>
              <img src={imageUrl} alt="image"/>
            </a>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
});

export default Popus;
