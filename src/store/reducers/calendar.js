import dayjs from 'dayjs';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    year: dayjs().year(),
    month: dayjs().month() + 1
};

const calendarReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_MONTH:
            return {
                ...state,
                month: parseInt(action.payload, 10)
            };

        case actionTypes.SET_YEAR:
            return {
                ...state,
                year: parseInt(action.payload, 10)
            };
        
        case actionTypes.RESET_CALENDAR:
            return {
                ...state,
                year: parseInt(action.payload.year, 10),
                month: parseInt(action.payload.month, 10)
            };

        default: return state;
    };
};

export default calendarReducer;