import * as actionTypes from './actionTypes';
import { resetCalendar } from '.';
import { resetEvent } from '.';

export const authSuccess = payload => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        payload
    };
};

const doLogout = () => ({ type: actionTypes.LOGOUT });

export const logout = () => {
    return dispatch => {
        dispatch(doLogout());
        dispatch(resetCalendar());
        dispatch(resetEvent());
    };
};

