import * as actionTypes from './actionTypes';

export const setEvents = ({ data, month, year }) => {
    return {
        type: actionTypes.SET_EVENTS,
        payload: {
            events: data,
            date: `${year}-${month}`
        }
    };
};

export const addEvent = ({ data, month, year }) => {
    return {
        type: actionTypes.ADD_EVENT,
        payload: {
            event: data,
            date: `${year}-${month}`
        }
    };
};

export const removeEvent = ({ id, month, year}) => {
    return {
        type: actionTypes.REMOVE_EVENT,
        payload: {
            eventId: id,
            date: `${year}-${month}`
        }
    };
};

export const resetEvent = () => {
    return {
        type: actionTypes.RESET_EVENTS,
        payload: {}
    };
};