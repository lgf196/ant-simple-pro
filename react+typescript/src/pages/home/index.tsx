import React, { memo } from 'react'
import { List, Card ,Avatar } from 'antd';

const index = memo(function index(props) {
  const { Meta } = Card;

  const data = [
    {
      title: 'vue',
      img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606222411854&di=f097ace643e702e80a45436d3b9b3c1f&imgtype=0&src=http%3A%2F%2Fimg.php.cn%2Fupload%2Farticle%2F000%2F000%2F013%2F58452323389fc205.png',
      des:'一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合'
    },
    {
      title: 'react',
      img:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2562962807,8352544&fm=26&gp=0.jpg',
      des:'用于构建用户界面的 JavaScript 库,React 使创建交互式 UI 变得轻而易举'
    },
    {
      title: 'angular',
      img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606223295087&di=1bd6c1d9c87c24458edc77f051eb00ba&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180226%2F28d9ed8bd555408cbe1fd4a446c4b671.jpeg',
      des:'一套框架，多种平台移动端 & 桌面端'
    },
    {
      title: 'node',
      img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606222411854&di=f097ace643e702e80a45436d3b9b3c1f&imgtype=0&src=http%3A%2F%2Fimg.php.cn%2Fupload%2Farticle%2F000%2F000%2F013%2F58452323389fc205.png',
      des:'一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合'
    },
    {
      title: 'vue',
      img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606222411854&di=f097ace643e702e80a45436d3b9b3c1f&imgtype=0&src=http%3A%2F%2Fimg.php.cn%2Fupload%2Farticle%2F000%2F000%2F013%2F58452323389fc205.png',
      des:'一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合'
    },
    
  ];
  
    return (
        <>
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
              dataSource={data}
              renderItem={item => (
                <List.Item>
                  <Card  hoverable  
                  cover={<img src={require('../../assets/image/pic.svg')} alt="logon"/>}>
                    <Meta
                        avatar={
                          <Avatar src={item.img}  shape="square"/>
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
export default index
