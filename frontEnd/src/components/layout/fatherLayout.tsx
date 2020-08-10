import React, { memo } from 'react'
import { renderRoutes ,RouteConfig} from 'react-router-config'
const FatherLayout:React.FC = memo(function FatherLayout({route}:RouteConfig) {
    return (
        <>
          {renderRoutes(route.routes)}
        </>
    )
})
export default FatherLayout
