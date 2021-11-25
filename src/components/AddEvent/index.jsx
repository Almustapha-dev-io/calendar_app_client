import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import formState from './addeventForm';
import Modal from 'components/Modal';
import { Input, FormGroup } from 'components/ui/StyledInput';
import controlValid from 'util/helpers/controlValid';
import useForm from 'hooks/useForm';
import { postAppointment } from 'services/appointments';

const showToast = (msg, type) => toast(msg, {
    type,
    position: 'top-right'
});

const AddEvent = (props) => {
    const token = useSelector((state) => state.auth.token);
    const { form, changeHandler, controls, resetForm } = useForm(formState);
    const [state, setState] = useState({
        loading: false,
        errorMessage: '',
    });

    useEffect(() => {
        if (!props.date) {
            resetForm();
        }
    }, [props.date, resetForm]);

    const handleError = useCallback((err) => {
        if (!err.response) {
            showToast('An unexpected error occured!', 'error');
            setState((state) => ({ ...state, loading: false }));
            return;
        }

        const { data } = err.response;
        setState((state) => ({
            ...state,
            loading: false,
            errorMessage: data.message,
        }));
    }, []);

    const addEvent = () => {
        const data = {
            title: form.controls.title.value,
            details: form.controls.details.value,
            appointmentDate: props.date.dateString,
        };

        postAppointment(data, token)
            .then((res) => {
                setState((state) => ({ ...state, loading: false }));
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
        } else {
            addEvent();
        }
    };

    return (
        <Modal
            show={props.date ? true : false}
            title="Add Event"
            closeButtonText="Cancel"
            onClose={props.close}
            closeButtonDisabled={state.loading}
            onProceed={submitHandler}
            proceedText="Add"
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
