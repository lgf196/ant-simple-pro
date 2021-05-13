import React, { memo, useState, useCallback } from 'react';
import PageLayout from '@/layouts/pageLayout';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Button, message, Input } from 'antd';

const Index = memo(function Index(props) {
  const { TextArea } = Input;

  const [text, setText] = useState(
    'Ant Simple Pro，简洁，美观，快速上手，组件丰富新的ui，简洁大方，支持vue3.0,ts+vue3.0,angular,react,react+ts,三大框架，5分钟快速搭建一个项目，简单上手快',
  );

  const change = useCallback((val) => {
    setText(val.target.value);
  }, []);

  return (
    <PageLayout>
      <TextArea
        autoSize={{ minRows: 2 }}
        defaultValue={text}
        onChange={change}
        style={{
          marginBottom: '10px',
        }}
      />
      <CopyToClipboard
        text={text}
        onCopy={() => message.success('复制成功,ctrl+v进行粘贴')}
      >
        <Button type="primary">复制</Button>
      </CopyToClipboard>
    </PageLayout>
  );
});

export default Index;
