import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import formState from './changePasswordForm';
import { SettingsContext } from 'context/settings-context';
import Modal from 'components/Modal';
import { Input, FormGroup } from 'components/ui/StyledInput';
import useForm from 'hooks/useForm';
import controlValid from 'util/helpers/controlValid';
import { sendPatch } from 'services/auth';
import showToast from 'util/helpers/showToast';

const ChangePassword = () => {
    const { push } = useHistory();
    const [state, setState] = useState({ loading: false });
    const token = useSelector((state) => state.auth.token);
    const { changePassword, setChangePassword } = useContext(SettingsContext);
    const { form, changeHandler, controls, resetForm } = useForm(formState);

    const closeHandler = () => {
        resetForm();
        setChangePassword(false);
    };

    const handleError = (err) => {
        let errMessage = 'An unexpected error occured!';
        if (err.response) {
            const { data } = err.response;
            errMessage = data.message;
        }

        showToast(errMessage, 'error');
        setState((state) => ({ ...state, loading: false }));
    };

    const passwordsMatch = () => {
        const { newPassword, confirmNewPassword } = form.controls;
        if (!newPassword.touched || !confirmNewPassword.touched) return true;
        return newPassword.value === confirmNewPassword.value;
    };

    const submitHandler = () => {
        if (!form.valid) return;

        const data = {
            oldPassword: form.controls.oldPassword.value,
            newPassword: form.controls.newPassword.value,
        };

        setState((state) => ({ ...state, loading: true }));
        sendPatch(data, '/change-password', token)
            .then((res) => {
                setState((state) => ({ ...state, loading: false }));
                closeHandler();
                showToast('Password changed. Please login', 'success');
                push('/logout');
            })
            .catch(handleError);
    };

    return (
        <Modal
            show={changePassword}
            title="Change your password"
            closeButtonText="Cancel"
            onClose={closeHandler}
            closeButtonDisabled={state.loading}
            onProceed={submitHandler}
            proceedText="Save"
            proceedButtonDisabled={!form.valid || state.loading || !passwordsMatch()}
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

            {!passwordsMatch() && (
                <p
                    style={{
                        margin: '20px 0 0',
                        color: '#f13740',
                        fontSize: '.8rem'
                    }}
                >
                    Your passwords must match
                </p>
            )}
        </Modal>
    );
};

export default ChangePassword;
