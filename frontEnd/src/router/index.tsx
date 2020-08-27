import React from 'react'
import { Switch, Route, Redirect} from 'react-router-dom'
import Login from '@/pages/login'
import { renderRoutes } from 'react-router-config'
import {menuRouter} from './staticRouter'
import Home from '@/pages/home'
import Layout from '@/components/layout'
import { history } from '@/assets/js/history'
import { ConnectedRouter } from 'connected-react-router'
const Routers: React.FC = () => {
    return (
        <ConnectedRouter history={history}>
            <Switch>
                <Route path="/login" exact component={Login} />
                <Route exact path="/" render={() =><Redirect to={{ pathname: '/home'}}/>} />
                {/* <Layout>
                    <Route path="/" exact render={() => <Redirect to='/home' />} />
                    <Route path="/home" exact component={Home} />
                </Layout> */}
                  {renderRoutes(menuRouter)}
            </Switch>
        </ConnectedRouter>
    )
}
export default Routers;