import React, { memo, useState, FC } from 'react';
import style from './topAd.module.scss';
import { CloseOutlined } from '@ant-design/icons';
import { CSSTransition } from 'react-transition-group';

export type TopAdType = {
  imageUrl: string;
  linkUrl: string;
  bg: string;
};

const TopAd: FC<TopAdType> = memo(function TopAd({ imageUrl, linkUrl, bg }) {
  const [visible, setVisible] = useState<boolean>(true);

  const close = (event: React.MouseEvent) => {
    event.preventDefault();
    setVisible(false);
  };

  return (
    <CSSTransition in={visible} classNames="fade" timeout={200} unmountOnExit>
      <div className={style.TopAd}>
        <a href={linkUrl} style={{ background: bg }}>
          <div className={style.image} style={{ backgroundImage: `url(${imageUrl})` }}>
            <CloseOutlined className={style.close} onClick={(e) => close(e)} />
          </div>
        </a>
      </div>
    </CSSTransition>
  );
});

export default TopAd;
