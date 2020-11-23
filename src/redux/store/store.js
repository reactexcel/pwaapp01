import { createStore, applyMiddleware } from "redux";
import watchAllSaga from "../saga/rootSaga";
import createSagaMiddleware from "redux-saga";
import rootReducer from '../reducers/rootReducer';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer,applyMiddleware(sagaMiddleware));
sagaMiddleware.run(watchAllSaga);

export default store;

