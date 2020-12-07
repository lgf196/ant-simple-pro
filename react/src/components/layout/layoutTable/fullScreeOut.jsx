import React, { memo, useState } from 'react'
import { Tooltip } from 'antd'
import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';
import screenfull from 'screenfull'

const FullScreeOut = memo(function FullScreeOut({ className, elementObj }) {
  const [fullscreen, setFullscreen] = useState(false);

  const handleFullScreen = () => { // 全屏事件
    let element = elementObj;
    if (screenfull.isEnabled) {
      screenfull.toggle(element);
      screenfull.on('change', () => setFullscreen(screenfull.isFullscreen));
    }
  }

  return (
    <>
      {!fullscreen ? <Tooltip title='全屏' placement="bottom">
        <FullscreenOutlined className={className} onClick={handleFullScreen} />
      </Tooltip> : <Tooltip title='退出' placement="bottom">
          <FullscreenExitOutlined className={className} onClick={handleFullScreen} />
        </Tooltip>
      }
    </>
  )
})

FullScreeOut.defaultProps = {
  elementObj: document.documentElement
}
export default FullScreeOut;
