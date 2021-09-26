import React, { memo } from 'react'
export interface HeadImageProps {
  url: string;
  width?: number;
  height?: number;
  className?: string;
}

const HeadImage: React.FC<HeadImageProps> = memo(function HeadImage({ url, width, height, className }) {
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

export default HeadImage
