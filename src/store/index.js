import {createStore,combineReducers,applyMiddleware,compose} from 'redux'
import thunk from "redux-thunk";
import reduxpromise from "redux-promise";

import changeNavbar from './reducers/changeNavbar'
import changeTitle from './reducers/changeTitle'
import nowplayingReducer from './reducers/nowplayingMovies'
import comingsoonReducer from './reducers/comingsoon'
var reducer = combineReducers({
	changeNavbar,
	changeTitle,
	nowplayingReducer,
	comingsoonReducer
})


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//为了开发阶段 ，调试使用， 
//上线之后 ，就不用了
const store = createStore(reducer,composeEnhancers(
	applyMiddleware(thunk,reduxpromise)
	))

export default store;