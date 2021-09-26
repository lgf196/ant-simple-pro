import React, { Suspense } from 'react'
import RoterLoading from '@/components/routerLoading'
import { Redirect } from 'react-router-dom'
import { isToken } from '@/utils/varbile'
interface propsType { // 必须要继承，不写的话，传入的组件将会报错
}

function menuRouter<T extends object>(WrappedComponent: React.ComponentType<T>) {
  return class Menu extends React.Component<T & propsType, {}> {
    constructor(props: T & propsType) {
      super(props);
    }
    render() {
      if (!isToken()) {
        return (<Redirect to={{ pathname: '/login', search: `?referrer=${Math.random() * 10000}` }} />)
      }
      return (
        <>
          <Suspense fallback={<RoterLoading />}>
            <WrappedComponent {...this.props as T} />
          </Suspense>
        </>
      );
    }
  }
}

export default menuRouter;
