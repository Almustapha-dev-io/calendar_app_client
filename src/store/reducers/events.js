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
    const updatedEvents = [...state[date], event];
    return {
        ...state,
        [date]: updatedEvents
    };
};

const eventsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_EVENTS: return setEvents(state, action.payload);

        case actionTypes.ADD_EVENT: return addEvent(state, action.payload);

        case actionTypes.RESET_EVENTS: return {};

        default: return state;
    };
};

export default eventsReducer;