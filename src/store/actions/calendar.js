import dayjs from 'dayjs';
import * as actionTypes from './actionTypes';

export const setYear = year => {
    return {
        type: actionTypes.SET_YEAR,
        payload: year
    };
};

export const setMonth = month => {
    return {
        type: actionTypes.SET_MONTH,
        payload: month
    };
};

export const resetCalendar = () => {
    return { 
        type: actionTypes.RESET_CALENDAR, 
        payload: {
            month: dayjs().month() + 1,
            year: dayjs().year()
        } 
    };
};

export const nextOrPrevious = payload => {
    return dispatch => {
        const { month, year } = payload;
        dispatch(setMonth(month));
        dispatch(setYear(year));
    };
};