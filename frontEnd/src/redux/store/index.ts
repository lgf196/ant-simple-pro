import { createStore ,applyMiddleware,compose} from 'redux'
import { routerMiddleware } from 'connected-react-router'
import { history } from '@/assets/js/history'
import createSagaMiddleware from 'redux-saga'
import reducer from '@/redux/reduce'
import rootSaga  from '@/redux/saga'
const sagaMiddleware = createSagaMiddleware();
const tools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(reducer, tools(applyMiddleware(routerMiddleware(history),sagaMiddleware)));
sagaMiddleware.run(rootSaga);
export default store;