import { combineReducers } from 'redux';


import configReducer from './Config/config.reducer';


const rootReducer = combineReducers({

    config: configReducer,

});

export default rootReducer;