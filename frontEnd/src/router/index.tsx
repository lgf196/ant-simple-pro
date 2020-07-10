import React from 'react'
import { Switch, Route, Redirect ,BrowserRouter as Router} from 'react-router-dom'
import Login from '@/pages/login'
import Home from '@/pages/home'
import Layout from '@/components/layout'
const Routers: React.FC = () => {
    return (
        <Router>
            <Switch>
                <Route path="/login" exact component={Login} />
                <Layout>
                    <Route path="/" exact render={() => <Redirect to='/home' />} />
                    <Route path="/home" exact component={Home} />
                </Layout>
            </Switch>
        </Router>
    )
}
export default Routers;