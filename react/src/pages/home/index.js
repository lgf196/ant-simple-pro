import React, { memo } from 'react'
import { List, Card, Avatar, Progress, Col, Row } from 'antd';
import { Pie, Bar } from '@ant-design/charts';
import SvgIcon from '@/components/svgIcon';
import logon from '@/assets/image/pic.svg'
import { environment } from '@/utils/varbile'
const index = memo(function index() {
  console.log('environment', environment())
  const { Meta } = Card

  const list = [
    {
      title: 'vue',
      img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606222411854&di=f097ace643e702e80a45436d3b9b3c1f&imgtype=0&src=http%3A%2F%2Fimg.php.cn%2Fupload%2Farticle%2F000%2F000%2F013%2F58452323389fc205.png',
      des: '一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。'
    },
    {
      title: 'react',
      img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2562962807,8352544&fm=26&gp=0.jpg',
      des: '用于构建用户界面的 JavaScript 库,React 使创建交互式 UI 变得轻而易举，强大的生态支持，hooks使代码更加减少和实用'
    },
    {
      title: 'angular',
      img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606223295087&di=1bd6c1d9c87c24458edc77f051eb00ba&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180226%2F28d9ed8bd555408cbe1fd4a446c4b671.jpeg',
      des: 'Angular构建应用，把这些代码和能力复用在多种多种不同平台的应用上，Web、移动 Web、移动应用等'
    },
    {
      title: 'webpack',
      img: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1768538313,3737670186&fm=26&gp=0.jpg',
      des: 'webpack找到JavaScript模块以及其它的一些浏览器不能直接运行的拓展语言（TypeScript等），将其转换和打包'
    }
  ];

  var data = [
    {
      type: 'ts',
      value: 40,
    },
    {
      type: 'react',
      value: 20,
    },
    {
      type: 'vue3.0',
      value: 20,
    },
    {
      type: 'angular',
      value: 10,
    },
    {
      type: 'css',
      value: 10,
    }
  ];

  var config = {
    appendPadding: 10,
    data: data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'outer',
      formatter(v) {
        return `${v.type}`
      }
    },
    interactions: [{ type: 'pie-legend-active' }, { type: 'element-active' }],
    legend: { position: 'bottom' },
    tooltip: {
      formatter: (v) => {
        return { name: v.type, value: v.value + '%' }
      },
    }
  };
  const barConfig = {
    data: data,
    xField: 'value',
    yField: 'type',
    seriesField: 'type',
    legend: { position: 'top' },
    tooltip: {
      formatter: (v) => {
        return { name: v.type, value: v.value + '%' }
      },
      showTitle: false
    }
  }

  return (
    <>
      <Row gutter={[10, 10]}>
        <Col xs={24} sm={24} md={12} lg={8} xl={8}>
          <Card
            hoverable
            cover={<img src={logon} alt="logon" height={250} />}>
            <Meta
              avatar={
                <SvgIcon iconClass='logon' fontSize='30px' />
              }
              title='Ant-Simple-Pro'
              description='简洁，美观，快速上手，支持3大框架；Concise, beautiful, quick to get started, support 3 big frameworks'
            />
            <ul style={{ marginTop: '10px' }}>
              {
                data.map((item, index) => (
                  <li key={index}>
                    <div>{item.type}</div>
                    <Progress percent={item.value} status="active" />
                  </li>
                ))
              }
            </ul>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={8}>
          <Pie {...config} className='bgW padding-10px' />
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={8}>
          <Bar {...barConfig} className='bgW padding-10px'></Bar>
        </Col>
      </Row>
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 4,
          lg: 4,
          xl: 4,
          xxl: 4,
        }}
        dataSource={list}
        renderItem={item => (
          <List.Item>
            <Card hoverable
              cover={<img src={logon} alt="logon" />}>
              <Meta
                avatar={
                  <Avatar src={item.img} shape="square" />
                }
                title={item.title}
                description={item.des}
              />
            </Card>
          </List.Item>
        )}
      />
    </>
  )
})
export default index;
