import React, { memo } from 'react'
import { Carousel } from 'antd';
import PropTypes from 'prop-types'

const Index = memo(function Index(props) {
  return (
    <>
      <Carousel autoplay>
          <div>
            <img src="https://img30.360buyimg.com/sku/jfs/t1/160182/1/12734/114962/6048676eE8368ce21/56a7f2c626e66aaf.jpg" alt="" />
          </div>
          <div>
            <img src="https://img30.360buyimg.com/sku/jfs/t1/160182/1/12734/114962/6048676eE8368ce21/56a7f2c626e66aaf.jpg" alt="" />
          </div>
      </Carousel>
    </>
  )
})

Index.propTypes = {

}

export default Index
