import {createStore,combineReducers,applyMiddleware,compose} from 'redux'
import thunk from 'redux-thunk'
import reduxpromise from 'redux-promise'

import changeNavbar from './reducers/changeNavbar'

var reducer = combineReducers({
	changeNavbar
})


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//为了开发阶段 ，调试使用， 
//上线之后 ，就不用了
const store = createStore(reducer,composeEnhancers(
	applyMiddleware(thunk,reduxpromise)
	))

export default store;