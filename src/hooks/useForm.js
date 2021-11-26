import { useReducer, useCallback } from 'react';
import controlChange from 'util/forms/controlChange';
import setInitialValue from 'util/forms/setInitialValue';

const reducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE': return controlChange(state, action.payload);
        case 'RESET': return { ...state, ...action.payload };
        case 'SET_VALUES': return setInitialValue(state, action);
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

    const setInitialValue = useCallback((values) => {
        dispatch({
            type: 'SET_VALUES',
            payload: values
        })
    }, []);

    const controls = Object
        .keys(form.controls)
        .map(key => form.controls[key]);


    return { form, changeHandler, controls, resetForm, setInitialValue };
};


export default useForm;

