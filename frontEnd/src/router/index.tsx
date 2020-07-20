import React from 'react'
import { Switch, Route, Redirect} from 'react-router-dom'
import Login from '@/pages/login'
import Home from '@/pages/home'
import Layout from '@/components/layout'
import { history } from '@/assets/js/history'
import { ConnectedRouter } from 'connected-react-router'
const Routers: React.FC = () => {
    return (
        <ConnectedRouter history={history}>
            <Switch>
                <Route path="/login" exact component={Login} />
                <Layout>
                    <Route path="/" exact render={() => <Redirect to='/home' />} />
                    <Route path="/home" exact component={Home} />
                </Layout>
            </Switch>
        </ConnectedRouter>
    )
}
export default Routers;