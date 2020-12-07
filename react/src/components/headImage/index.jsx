import React, { memo } from 'react'
import PropTypes from 'prop-types';

const HeadImage = memo(function HeadImage({ url, width, height, className }) {
  return (
    <>
      <img src={url} alt="头像" width={width} height={height} style={HeadImagetyle} className={className} />
    </>
  )
})

const HeadImagetyle = {
  borderRadius: '50%',
}

HeadImage.defaultProps = {
  width: 26,
  height: 26
}

HeadImage.propTypes = {
  url:PropTypes.string.isRequired,
  width:PropTypes.number,
  height:PropTypes.number,
  className:PropTypes.string
};
export default HeadImage
