import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { history } from '@/assets/js/history';
import createSagaMiddleware from 'redux-saga';
import reducer from '@/redux/reduce';
import rootSaga from '@/redux/saga';
import { environment } from '@/utils/varbile';
const sagaMiddleware = createSagaMiddleware();

const middlewares = [routerMiddleware(history), sagaMiddleware];

const tools =
  environment() === 'dev' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose;

const enhancer = tools(applyMiddleware(...middlewares));

let store = createStore(reducer, enhancer);

sagaMiddleware.run(rootSaga);

export default store;
