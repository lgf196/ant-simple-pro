import React, { memo,useState } from 'react'
import style from './topAd.module.scss'
import { CloseOutlined } from '@ant-design/icons';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types'

const TopAd = memo(function TopAd({imageUrl,linkUrl,bg}) {

  const [visible,setVisible] = useState(true);

  const close = (event)=>{
    event.preventDefault();
    setVisible(false);
  }

  return (
    <CSSTransition in={visible} classNames="fade" timeout={200} unmountOnExit>
      <div className={style.TopAd}>
        <a href={linkUrl} style={{background:bg}}>
          <div className={style.image} style={{backgroundImage:`url(${imageUrl})`}}>
            <CloseOutlined className={style.close} onClick={e=>close(e)} />
          </div>
        </a>
      </div>
    </CSSTransition>
  )
})

TopAd.propTypes = {
  imageUrl:PropTypes.string.isRequired,
  linkUrl:PropTypes.string.isRequired,
  bg:PropTypes.string.isRequired
}

export default TopAd;
