import React, { useCallback, useEffect, useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import formState from './addeventForm';
import { EventContext } from 'context/event-context';
import Modal from 'components/Modal';
import { Input, FormGroup } from 'components/ui/StyledInput';
import useForm from 'hooks/useForm';
import { postAppointment, updateAppointment } from 'services/appointments';
import controlValid from 'util/helpers/controlValid';
import showToast from 'util/helpers/showToast';
import { addEvent, updateEvent } from 'store/actions';

const AddEvent = () => {
    const dispatch = useDispatch();
    const { event, date, setDate, setEventAndDate } = useContext(EventContext);
    const token = useSelector((state) => state.auth.token);
    const calendarState = useSelector((state) => state.calendar);
    const [state, setState] = useState({ loading: false });
    const { form, changeHandler, controls, resetForm, setInitialValue } =
        useForm(formState);

    const addEventToStore = useCallback(
        (data, update = false) => {
            const { month, year } = calendarState;
            if (update) {
                dispatch(updateEvent({ data, month, year }));
                return;
            }

            dispatch(addEvent({ data, month, year }));
        },
        [calendarState, dispatch]
    );

    useEffect(() => {
        if (!date) resetForm();
        else {
            if (event) setInitialValue(event);
        }
    }, [date, event, resetForm, setInitialValue]);

    const handleError = useCallback((err) => {
        let errMessage = 'An unexpected error occured!';
        if (err.response) {
            const { data } = err.response;
            errMessage = data.message;
        }

        showToast(errMessage, 'error');
        setState((state) => ({ ...state, loading: false }));
    }, []);

    const getData = () => ({
        title: form.controls.title.value,
        details: form.controls.details.value,
        appointmentDate: event ? event.appointmentDate : date.dateString,
    });

    const saveEvent = () => {
        postAppointment(getData(), token)
            .then((res) => {
                setState((state) => ({ ...state, loading: false }));
                addEventToStore(res.data.data);
                showToast('Event added!', 'success');
                setDate(null);
            })
            .catch(handleError);
    };

    const editEvent = () => {
        updateAppointment(getData(), event._id, token)
            .then((res) => {
                setState((state) => ({ ...state, loading: false }));
                addEventToStore(res.data.data, true);
                showToast('Event updated!', 'success');
                setEventAndDate({ date: null, event: res.data.data });
            })
            .catch(handleError);
    };

    const submitHandler = () => {
        if (!form.valid) return;

        setState((state) => ({ ...state, loading: true }));
        if (event) return editEvent();

        saveEvent();
    };

    return (
        <Modal
            show={date ? true : false}
            title={event ? 'Update Event' : 'Add Event'}
            closeButtonText="Cancel"
            onClose={() => setDate(null)}
            closeButtonDisabled={state.loading}
            onProceed={submitHandler}
            proceedText={event ? 'Save' : 'Add'}
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
        </Modal>
    );
};

export default AddEvent;
