import * as actionTypes from './actionTypes';

export const authSuccess = payload => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        payload
    };
};

export const logout = () => {
    return { type: actionTypes.LOGOUT };
};