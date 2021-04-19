import React, { memo } from 'react'
import PageLayout from '@/layouts/pageLayout'
import { Menu, Item, useContextMenu } from 'react-contexify';
import { message } from 'antd';
import 'react-contexify/dist/ReactContexify.css';
import Logo from '@/assets/image/Icon_512x512-15@1x@1x.png'
import Edit from './component/edit'
import { useSetState } from '@/hooks'
import { CopyToClipboard } from 'react-copy-to-clipboard';

const Index = memo(function Index(props) {

  const MENU_ID = 'antSimplePro';

  const [ editData,setEditData ] = useSetState({visible:false,content:{
    title:'ant-simple-pro',
    describe:'简洁，美观，快速上手，支持3大框架；Concise, beautiful, quick to get started, support 3 big frameworks'
  }});

  const { show } = useContextMenu({
    id: MENU_ID,
  });

  const handleContextMenu=(event)=>{
      event.preventDefault();
      show(event, {
        props: {
            key: 'value'
        }
      })
  };

  const handleItemClick = ({ event, props },status) => {
    if( status === 1 ){
      setEditData({visible:true});
    }
  };

  return (
    <PageLayout>
      <div className='border svg-fontSize padding-10px' style={{textAlign:'center'}} onContextMenu={handleContextMenu}>
        <img src={Logo} alt="logo"/>
        <h2 className='padding-10px' style={{fontWeight:'bold',fontSize:'20px'}}>{editData.content.title}</h2>
        <section>{editData.content.describe}</section>
      </div>
      <Edit {...editData} callBack={setEditData}/>
    <Menu id={MENU_ID}>
      <Item onClick={(event)=>handleItemClick(event,1)}>编辑</Item>
      <Item>
        <CopyToClipboard text={editData.content.title}
          onCopy={() => message.success('复制成功,ctrl+v进行粘贴')}>
            <span>复制标题</span>
        </CopyToClipboard>
      </Item>
    </Menu>
    </PageLayout>
  )
})
export default Index
