import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { history } from '@/assets/js/history'
import user from './user'
const Reducer = combineReducers({
    router: connectRouter(history), //采用connected-react-router
    user
});
export default Reducer