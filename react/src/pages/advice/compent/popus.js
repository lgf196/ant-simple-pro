import React, { memo } from 'react';
import style from './popus.module.scss';
import PropTypes from 'prop-types';
import { CloseOutlined } from '@ant-design/icons';
import { CSSTransition } from 'react-transition-group';

const Popus = memo(function Popus({ visible, close,imageUrl,linkUrl }) {
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

Popus.propTypes = {
  visible:PropTypes.bool.isRequired,
  close:PropTypes.func.isRequired,
  imageUrl:PropTypes.string.isRequired,
  linkUrl:PropTypes.string.isRequired
};

export default Popus;
