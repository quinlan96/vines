import { combineReducers } from 'redux';
import vineReducer from './vine';

const rootReducer = combineReducers({
    vine: vineReducer,
});

export default rootReducer;
