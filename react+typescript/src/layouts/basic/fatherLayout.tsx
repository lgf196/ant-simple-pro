import React, { memo } from 'react'
import { renderRoutes, RouteConfig } from 'react-router-config'
import '@/assets/scss/common.scss'
const FatherLayout: React.FC = memo(function FatherLayout({ route, location }: RouteConfig) {
  return (
    <>
      {renderRoutes(route.routes)}
    </>
  )
})
export default FatherLayout
