import React, { memo, FC } from 'react';

export type propsType = {
  className?: string;
  style?: React.CSSProperties;
};

const Index: FC<propsType> = memo(function Index({
  children,
  className,
  style,
}) {
  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
});

Index.defaultProps = {
  className: 'bgW padding-10px',
};

export default Index;
