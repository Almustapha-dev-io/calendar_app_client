import { combineReducers } from 'redux';
import authReducer from './auth';
import calendarReducer from './calendar';

const rootReducer = combineReducers({
    auth: authReducer,
    calendar: calendarReducer
});

export default rootReducer;