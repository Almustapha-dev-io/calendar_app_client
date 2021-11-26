import * as actionTypes from '../actions/actionTypes';

const initialState = {};

const setEvents = (state, payload) => {
    const { date, events } = payload;
    return {
        ...state,
        [date]: events
    };
};

const addEvent = (state, payload) => {
    const { date, event } = payload;
    const events = state[date] ? state[date] : [];
    const updatedEvents = [...events, event];
    return {
        ...state,
        [date]: updatedEvents
    };
};

const removeEvent = (state, payload) => {
    const { date, eventId } = payload;
    const events = state[date].filter(event => event._id !== eventId);
    return {
        ...state,
        [date]: events
    };
};

const eventsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_EVENTS: return setEvents(state, action.payload);

        case actionTypes.ADD_EVENT: return addEvent(state, action.payload);
        
        case actionTypes.REMOVE_EVENT: return removeEvent(state, action.payload);

        case actionTypes.RESET_EVENTS: return {};

        default: return state;
    };
};

export default eventsReducer;