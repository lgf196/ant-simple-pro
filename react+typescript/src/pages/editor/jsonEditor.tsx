import React, { memo,useEffect,useRef } from 'react'
import PageLayout from '@/layouts/pageLayout'
import JSONEditor,{ JSONEditorOptions } from 'jsoneditor';
import 'jsoneditor/dist/jsoneditor.css';

const JsonEditor = memo(function JsonEditor(props) {

  const json = {
    'array': [1, 2, 3],
    'boolean': true,
    'null': null,
    'number': 123,
    'object': {'a': 'b', 'c': 'd'},
    'string': 'Hello World'
  }

  const jsoneditor = useRef<JSONEditor>(null);

  const container = useRef<HTMLDivElement>(null);

  const onChangeJSON = (val:any) =>{
    console.log(`val`, val)
  }

  useEffect(() => {
    const options:JSONEditorOptions = {
      mode: 'tree',
      onChangeJSON
    };
    (jsoneditor.current as JSONEditor) = new JSONEditor(container.current!, options);
    jsoneditor.current!.set(json);
    return () => {
      jsoneditor && jsoneditor.current!.destroy();
    }
  }, []);

  return (
    <PageLayout>
      <div style={{height:'100%',width:'100%'}} ref={container} />
    </PageLayout>
  )
})

export default JsonEditor;
