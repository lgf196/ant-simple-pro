import React from 'react'
import { renderRoutes } from 'react-router-config'
import ReactConfig from './routers'
import { history } from '@/assets/js/history'
import { ConnectedRouter } from 'connected-react-router'
const Routers = () => {
  return (
    <ConnectedRouter history={history}>
      {renderRoutes(ReactConfig)}
    </ConnectedRouter>
  )
}
export default Routers;
