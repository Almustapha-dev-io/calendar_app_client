import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import formState from './addeventForm';
import Modal from 'components/Modal';
import { Input, FormGroup } from 'components/ui/StyledInput';
import useForm from 'hooks/useForm';
import { postAppointment } from 'services/appointments';
import controlValid from 'util/helpers/controlValid';
import showToast from 'util/helpers/showToast';
import { addEvent } from 'store/actions';

const AddEvent = (props) => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);
    const calendarState = useSelector((state) => state.calendar);
    const [state, setState] = useState({ loading: false });
    const { form, changeHandler, controls, resetForm, setInitialValue } = useForm(formState);

    const addEventToStore = useCallback(
        (data) => {
            const { month, year } = calendarState;
            dispatch(addEvent({ data, month, year }));
        },
        [calendarState, dispatch]
    );

    useEffect(() => {
        if (!props.date) {
            resetForm();
        } else {
            if (props.event) {
                console.log(props.event);
                setInitialValue(props.event);
            }
        }
    }, [props.date, props.event, resetForm, setInitialValue]);

    const handleError = useCallback((err) => {
        let errMessage = 'An unexpected error occured!';
        if (err.response) {
            const { data } = err.response;
            errMessage = data.message;
        }

        showToast(errMessage, 'error');
        setState((state) => ({ ...state, loading: false }));
    }, []);

    const saveEvent = () => {
        const data = {
            title: form.controls.title.value,
            details: form.controls.details.value,
            appointmentDate: props.date.dateString,
        };

        postAppointment(data, token)
            .then((res) => {
                setState((state) => ({ ...state, loading: false }));
                addEventToStore(res.data.data);
                showToast('Event added', 'success');
                props.close();
            })
            .catch(handleError);
    };

    const submitHandler = () => {
        if (!form.valid) return;

        setState((state) => ({ ...state, loading: true }));
        if (props.event) {
            // updateEvent();
            console.log(form);
        } else {
            saveEvent();
        }
    };

    return (
        <Modal
            show={props.date ? true : false}
            title={props.event ? 'Update Event' : 'Add Event'}
            closeButtonText="Cancel"
            onClose={props.close}
            closeButtonDisabled={state.loading}
            onProceed={submitHandler}
            proceedText={props.event ? 'Save' : 'Add'}
            proceedButtonDisabled={!form.valid || state.loading}
            styleX={{ width: '400px' }}
            buttonLoader={state.loading}
        >
            {controls.map((c) => (
                <FormGroup key={c.id}>
                    {c.label && (
                        <label className={controlValid(c) ? '' : 'invalid'}>
                            {c.label}
                        </label>
                    )}

                    <Input
                        className={controlValid(c) ? '' : 'invalid'}
                        id={c.id}
                        as={c.elementType}
                        {...c.config}
                        disabled={state.loading}
                        value={c.value}
                        onChange={(e) => changeHandler(e.target.value, c.id)}
                    />

                    {c.errors.map((e) => (
                        <span className="error" key={e}>
                            {e}
                        </span>
                    ))}
                </FormGroup>
            ))}
            {/* <pre>{JSON.stringify(props.date, null, 2)}</pre> */}
        </Modal>
    );
};

AddEvent.propTypes = {
    close: PropTypes.func.isRequired,
    date: PropTypes.object,
    event: PropTypes.object,
};

export default AddEvent;
