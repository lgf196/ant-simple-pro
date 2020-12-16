import React, { memo } from 'react'
import { renderRoutes } from 'react-router-config'

const FatherLayout = memo(function FatherLayout({ route }) {
  return (
    <>
      {renderRoutes(route.routes)}
    </>
  )
})
export default FatherLayout;
