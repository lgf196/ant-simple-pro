import React, { memo,useMemo,Suspense } from 'react'
import { lazyComponent } from '@/utils/function'
import RoterLoading from '@/components/routerLoading'
import PropTypes from 'prop-types'

const RenderTemplate = memo(function RenderTemplate(props) {

  const { type } = props;

  const DynamicFunc = (type)=>{
    const BaseCompent = lazyComponent(`drag/baseCompents/${type}`);
      return ()=>(
      <Suspense fallback={<RoterLoading />}>
        <BaseCompent />
      </Suspense>
    )
  };

  const Render = useMemo(()=>{
    return DynamicFunc(type)
  },[type]);

  return <Render {...props}/>
})

RenderTemplate.propTypes = {

}

export default RenderTemplate
