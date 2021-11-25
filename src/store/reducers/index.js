import { combineReducers } from 'redux';
import authReducer from './auth';
import calendarReducer from './calendar';
import eventsReducer from './events';

const rootReducer = combineReducers({
    auth: authReducer,
    calendar: calendarReducer,
    events: eventsReducer
});

export default rootReducer;