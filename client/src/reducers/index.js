import { combineReducers } from "redux";
import playerReducer from './playerReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import teamReducer from './teamReducer';

export default combineReducers({
    player: playerReducer,
    error: errorReducer,
    auth: authReducer,
    team: teamReducer   
});