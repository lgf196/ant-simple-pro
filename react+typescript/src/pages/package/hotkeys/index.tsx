import React, { memo,useState,useCallback, ChangeEventHandler } from 'react'
import PageLayout from '@/layouts/pageLayout'
import { useHotkeys } from 'react-hotkeys-hook';
import { Input } from 'antd';
const { TextArea } = Input;

const Index = memo(function Index(props) {

  const [disabled, setDisabled] = useState(true);

  const [text, setText] = useState('简洁，美观，快速上手，支持3大框架；Concise, beautiful, quick to get started, support 3 big frameworks');

  useHotkeys('ctrl+d', (event) =>keyMonitor(event,false));

  useHotkeys('ctrl+s', (event) =>keyMonitor(event,true));

  const change = useCallback<ChangeEventHandler>((e)=>{
    setText((e.target as any).value);
  },[])

  const keyMonitor = useCallback((event:KeyboardEvent,status)=>{
    event.preventDefault();
    setDisabled(status)
  },[useHotkeys]);

  return (
    <PageLayout>
      <ul>
        <li className='padding-10px'>按下<code>ctrl+d</code>键编辑当前文本</li>
        <li className='padding-10px'>按下<code>ctrl+s</code>键保存当前文本</li>
      </ul>
      <p className='padding-10px'>{text}</p>
      <TextArea defaultValue={text} disabled={disabled} onChange={change}  autoSize={{ minRows: 3 }}/>
    </PageLayout>
  )
})

export default Index
