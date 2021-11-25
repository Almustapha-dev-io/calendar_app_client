import { useReducer, useCallback } from 'react';
import controlChange from 'util/forms/controlChange';

const reducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE': return controlChange(state, action.payload);
        case 'RESET': return { ...state, ...action.payload };
        default: throw Error('useForm.js: invalid action type');
    };
};

const useForm = initialState => {
    const [form, dispatch] = useReducer(reducer, initialState);

    const changeHandler = useCallback((value, control) => {
        dispatch({
            type: 'CHANGE',
            payload: { control, value }
        });
    }, []);

    const resetForm = useCallback(() => dispatch({
        type: 'RESET',
        payload: initialState
    }), [initialState]);

    const controls = Object
        .keys(form.controls)
        .map(key => form.controls[key]);


    return { form, changeHandler, controls, resetForm };
};


export default useForm;

