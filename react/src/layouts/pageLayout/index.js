import React, { memo } from 'react'
import PropTypes from 'prop-types'

const Index = memo(function Index({children,className}) {
  return (
    <div className={className}>
      {children}
    </div>
  )
})

Index.defaultProps = {
  className:'bgW padding-10px',
}

Index.propTypes = {
  className:PropTypes.string,
  style:PropTypes.string
}

export default Index;
