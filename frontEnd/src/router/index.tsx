import React from 'react'
import { Switch ,Route ,Router} from 'react-router-dom'
import {history} from '@/assets/js/history'
import Login from '@/pages/login'
const Routers:React.FC=()=>{
    return (
        <Router history={history}>
            <Switch>
                <Route path="/login" exact component={Login} />
            </Switch>
        </Router>
    )
}
export default Routers;