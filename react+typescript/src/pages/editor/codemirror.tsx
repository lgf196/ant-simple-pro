import React, { memo } from 'react';
import PageLayout from '@/layouts/pageLayout';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
require('codemirror/mode/xml/xml');
require('codemirror/mode/javascript/javascript');

const Codemirror = memo(function Codemirror(props) {
  const jsCode = `
  // pages/home
  import React, {useEffect,useState} from 'react'
  import { userList } from '@/api/login'
  export type userListType={
      name:string;
      aga:number;
      sex:string
  };
  const App:React.FC=()=>{
    const [result, setResult] = useState<userListType[]>([]);
    useEffect(() => {
      const api=async ()=>{
          let res=await userList({username:'li'});
          setResult(res.data);
      }
      api();
    }, [])
      return (
      <>
          {result.length ?
              result.map((item,index)=>(
                   <p key={index}>{item.name}</p>
              ))
           : null}
      </>)
  }
  `;

  return (
    <PageLayout>
      <CodeMirror
        value={jsCode}
        options={{
          mode: 'javascript',
          theme: 'material',
          lineNumbers: true,
        }}
        autoScroll={false}
        className="CodeMirrorStyle"
        onChange={(editor, data, value) => {}}
      />
    </PageLayout>
  );
});

export default Codemirror;
