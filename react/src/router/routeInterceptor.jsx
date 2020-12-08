import React, { Suspense } from 'react'
import RoterLoading from '@/components/routerLoading'
import { Redirect } from 'react-router-dom'
import { isToken } from '@/utils/varbile'

function menuRouter(WrappedComponent) {
  return class Menu extends React.Component{
    constructor(props) {
      super(props);
    }
    render() {
      if (!isToken()) {
        return (<Redirect to={{ pathname: '/login', search: `?referrer=${Math.random() * 10000}` }} />)
      }
      return (
        <>
          <Suspense fallback={<RoterLoading />}>
            <WrappedComponent {...this.props} />
          </Suspense>
        </>
      );
    }
  }
}

export default menuRouter;
