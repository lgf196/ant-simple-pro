import React from 'react'
import { Switch, Route, Redirect ,BrowserRouter as Router} from 'react-router-dom'
import { history } from '@/assets/js/history'
import Login from '@/pages/login'
import Home from '@/pages/home'
const Routers: React.FC = () => {
    return (
        <Router>
            <Switch>
                <Route path="/login" exact component={Login} />
                <Route path="/" exact render={() => <Redirect to='/home' />} />
                <Route path="/home" exact component={Home} />
            </Switch>
        </Router>
    )
}
export default Routers;