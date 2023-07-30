//import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './rootReducer';

import { legacy_createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

//const enhancers = [applyMiddleware(thunk), composeWithDevTools()];
const enhancers = [applyMiddleware(thunk)];

const store = legacy_createStore(

    rootReducer,
    compose(...enhancers)

);


export default store;