import React, { memo,useMemo,Suspense,FC } from 'react'
import { lazyComponent } from '@/utils/function'
import RoterLoading from '@/components/routerLoading'

export type RenderTemplateType = {
  type:string
}
const RenderTemplate:FC<RenderTemplateType> = memo(function RenderTemplate(props) {

  const { type } = props;

  const DynamicFunc = (type:string)=>{
    const BaseCompent = lazyComponent(`drag/baseCompents/${type}`);
      return ()=>(
      <Suspense fallback={<RoterLoading />}>
        <BaseCompent />
      </Suspense>
    )
  };

  const Render = useMemo(()=>{
    return (DynamicFunc(type) as unknown) as FC<RenderTemplateType>
  },[type]);

  return <Render {...props}/>
})

export default RenderTemplate
