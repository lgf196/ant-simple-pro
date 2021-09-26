import React, { memo } from 'react'
import { useTranslation } from 'react-i18next';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import { Radio, List, Space } from 'antd';
import SvgIcon from '@/components/svgIcon';
import { RadioChangeEvent } from 'antd/lib/radio';
import '@/il8n';
const Globalization = memo(function Globalization(props) {
  const { t, i18n } = useTranslation();

  const listData: any[] | undefined = [];
  for (let i = 0; i < 3; i++) {
    listData.push({
      index: i,
      title: `Ant Simple Pro`,
      avatar: <SvgIcon iconClass='logon' fontSize='30px' />,
      description: t('description'),
      content: t('content')
    });
  }

  const IconText = ({ icon, text }: any) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  const change = (val: RadioChangeEvent) => {
    const lang = val.target.value;
    i18n.changeLanguage(lang);
  }

  return (
    <div className='bgW padding-10px'>
      <div>
        <Radio.Group defaultValue="en" buttonStyle="solid" onChange={change}>
          <Radio.Button value="en">英文</Radio.Button>
          <Radio.Button value="zh">中文</Radio.Button>
          <Radio.Button value="ja">日文</Radio.Button>
        </Radio.Group>
        <a href="https://react.i18next.com/" style={{ padding: '0 10px' }} target='_blank'>了解过多react-i18next信息</a>
      </div>
      <List
        itemLayout="vertical"
        size="large"
        dataSource={listData}
        renderItem={item => (
          <List.Item
            key={item.index}
            actions={[
              <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
              <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
              <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
            ]}
            extra={
              <img
                width={272}
                alt="logo"
                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
              />
            }
          >
            <List.Item.Meta
              avatar={item.avatar}
              title={<a href={item.href}>{item.title}</a>}
              description={item.description}
            />
            {item.content}
          </List.Item>
        )}
      />
    </div>
  )
})
export default Globalization
