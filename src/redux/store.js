import {
    createStore,
    applyMiddleware
} from 'redux'
import reducer from './reducers';
import thunkMiddleware from 'redux-thunk';

let store = createStore(reducer,applyMiddleware(thunkMiddleware));

export default store;