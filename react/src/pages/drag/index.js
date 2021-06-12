import React, { memo } from 'react';
import PageLayout from '@/layouts/pageLayout';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Container from './compent/container';

const Index = memo(function Index(props) {
  return (
    <PageLayout>
      <p style={{ textAlign: 'center', padding: '10px 0' }}>
        实现一个简单的可视化页面生成器
        <code>
          (简易版本，大致的架子，要想开发完整的，请查看这个项目
          <a href="https://github.com/lgf196/ant-simple-draw">
            ant-simple-draw
          </a>
          )
        </code>
      </p>
      <DndProvider backend={HTML5Backend}>
        <Container />
      </DndProvider>
    </PageLayout>
  );
});

export default Index;
