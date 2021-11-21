import { useCallback, useReducer } from 'react';

const initialState = {
    loading: null,
    error: null,
    data: null
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'START': return {
            ...state,
            loading: true,
            error: null,
            data: null
        };

        case 'SUCCESS': return {
            ...state,
            data: action.payload,
            loading: false,
            error: null
        };

        case 'FAILED': return {
            ...state,
            error: action.payload,
            loading: false,
            data: null
        };

        case 'RESET': return initialState;

        default: throw Error('useAxios.js: Invalid action.');
    };
};


const useAxios = axios => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const send = useCallback(async config => {
        dispatch({ type: 'START' });

        try {
            const { data } = await axios.request(config);
            dispatch({
                type: 'SUCCESS',
                payload: data
            });
        } catch (error) {
            dispatch({
                type: 'FAILED',
                payload: error.response
            });
        }
    }, [axios]);

    const reset = useCallback(() => dispatch({
        type: 'RESET'
    }), []);

    return [state, send, reset];
};

export default useAxios;