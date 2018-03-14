import {
    combineReducers
} from 'redux'
import counter from './reducers/counter';
import userInfo from './reducers/userInfo';
import index from './reducers/index';
// import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

let reducer = combineReducers({
    counter,
    userInfo,
    index,
    // routing: routerReducer
})

export default reducer;