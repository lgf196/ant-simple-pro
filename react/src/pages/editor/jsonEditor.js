import React, { memo, useEffect, useRef } from 'react';
import PageLayout from '@/layouts/pageLayout';
import JSONEditor from 'jsoneditor';
import 'jsoneditor/dist/jsoneditor.css';

const JsonEditor = memo(function JsonEditor(props) {
  const json = {
    array: [1, 2, 3],
    boolean: true,
    null: null,
    number: 123,
    object: { a: 'b', c: 'd' },
    string: 'Hello World',
  };

  const jsoneditor = useRef(null);

  const container = useRef(null);

  const onChangeJSON = (val) => {
    console.log(`val`, val);
  };

  useEffect(() => {
    const options = {
      mode: 'tree',
      onChangeJSON,
    };
    jsoneditor.current = new JSONEditor(container.current, options);
    jsoneditor.current.set(json);
    return () => {
      jsoneditor && jsoneditor.current.destroy();
    };
  }, []);

  return (
    <PageLayout>
      <div style={{ height: '100%', width: '100%' }} ref={container} />
    </PageLayout>
  );
});

export default JsonEditor;
