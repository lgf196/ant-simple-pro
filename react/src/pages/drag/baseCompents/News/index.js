import React, { memo,useState,useEffect } from 'react'
import { NotificationOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types'

const NewCompent = memo(function NewCompent(props) {

  return (
    <div style={{fontSize:'16px',fontWeight:'bold'}}>
      <NotificationOutlined />
      <span style={{padding:"0 10px"}}>ant-simple-pro上线了！</span>
    </div>
  )
})

NewCompent.propTypes = {

}

export default NewCompent;
