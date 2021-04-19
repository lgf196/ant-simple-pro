import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { List, Avatar } from 'antd';
import SvgIcon from '@/components/svgIcon';

const data = [
  {
    title: 'Ant Simple pro 1',
  },
  {
    title: 'Ant Simple pro 2',
  }
];

const Index = memo(function Index(props) {
  return (
    <>
     <List
    itemLayout="horizontal"
    dataSource={data}
    renderItem={item => (
      <List.Item>
        <List.Item.Meta
          avatar={
            <SvgIcon iconClass='logon' fontSize='30px' />
          }
          title='Ant-Simple-Pro'
          description='简洁，美观，快速上手，支持3大框架；Concise, beautiful, quick to get started, support 3 big frameworks'
        />
      </List.Item>
    )}
  />,
    </>
  )
})

Index.propTypes = {

}

export default Index
