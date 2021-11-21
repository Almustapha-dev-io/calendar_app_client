import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    userInfo: null
};

const authReducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_SUCCESS: return {
            ...state,
            token: action.payload.token,
            userInfo: action.payload.userInfo
        };

        case actionTypes.LOGOUT: return {
            ...state,
            token: null,
            userInfo: null
        };

        default: return state;
    }
};

export default authReducer;