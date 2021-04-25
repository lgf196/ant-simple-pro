import React, { Suspense } from 'react'
import RoterLoading from '@/components/routerLoading'
import { Redirect } from 'react-router-dom'
import { isToken } from '@/utils/varbile'
import { environment } from '@/utils/varbile'

function menuRouter(WrappedComponent) {
  return class Menu extends React.Component{
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
    static getDerivedStateFromError(error) { // 页面全局捕捉异常
      return { hasError: true };
    }
    componentDidCatch(error, info) {
      // console.log('error', error,info)
    }
    render() {
      if (this.state.hasError && environment()!=='dev') { // 页面出错了，就跳转
        this.setState({hasError:false});
        return <Redirect to={{ pathname: '/pageError', search: `?referrer=${Math.random() * 10000}` }} />;
      }
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
