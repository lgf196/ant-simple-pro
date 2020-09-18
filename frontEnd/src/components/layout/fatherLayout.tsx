import React, { memo } from 'react'
import { renderRoutes ,RouteConfig} from 'react-router-config'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import '@/assets/scss/common.scss'
const FatherLayout:React.FC = memo(function FatherLayout({route,location}:RouteConfig) {
    return (
        <>
         {/* <TransitionGroup>
            <CSSTransition
                key={location!.pathname}
                timeout={{ enter: 300, exit: 0 }}
                classNames="fade"
                > */}
                {renderRoutes(route.routes)}
            {/* </CSSTransition>
          </TransitionGroup> */}
        </>
    )
})
export default FatherLayout
