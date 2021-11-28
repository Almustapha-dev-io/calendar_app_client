import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import recoveryForm from './recoveryForm';
import { PrimaryButton } from 'components/ui/StyledButton';
import { Input, FormGroup } from 'components/ui/StyledInput';
import { StyledLink } from 'components/ui/StlyedLinks';
import Spinner from 'components/ui/Spinner';
import { AlertDanger } from 'components/ui/StyledAlerts';

import useForm from 'hooks/useForm';
import controlValid from 'util/helpers/controlValid';
import { sendPost } from 'services/auth';

const links = [
    {
        path: '/auth/register',
        anchorText: 'Register',
        text: `Don't have an account?`,
    },
    {
        path: '/auth/login',
        anchorText: 'Login',
        text: 'Remember your password?',
    },
];

const RecoverPassword = (props) => {
    const { push } = useHistory();
    const [state, setState] = useState({
        loading: false,
        errorMessage: '',
    });
    const { form, changeHandler, controls } = useForm(recoveryForm);

    const handleError = useCallback((err) => {
        if (!err.response) {
            toast('An unexpected errror occured!', { type: 'error' });
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

    const control = controls[0];

    const submitHandler = () => {
        if (!form.valid) return;

        setState((state) => ({ ...state, loading: true }));
        const email = control.value;
        sendPost({ email }, '/recover-password')
            .then(() => {
                setState((state) => ({ ...state, loading: false }));
                push('/auth/confirm');
            })
            .catch(handleError);
    };

    return (
        <>
            <h2>Password Recovery</h2>
            {state.errorMessage && (
                <AlertDanger style={{ marginBottom: '10px   ' }}>
                    {state.errorMessage}
                </AlertDanger>
            )}

            <FormGroup key={control.id}>
                {control.label && (
                    <label className={controlValid(control) ? '' : 'invalid'}>
                        {control.label}
                    </label>
                )}
                <Input
                    className={controlValid(control) ? '' : 'invalid'}
                    id={control.id}
                    as={control.elementType}
                    {...control.config}
                    value={control.value}
                    disabled={state.loading}
                    onChange={(e) => changeHandler(e.target.value, control.id)}
                />
                {control.errors.map((e) => (
                    <span className="error" key={e}>
                        {e}
                    </span>
                ))}
            </FormGroup>

            <PrimaryButton
                onClick={submitHandler}
                disabled={!form.valid || state.loading}
                style={{ margin: '20px 0' }}
                fullWidth
            >
                {state.loading ? <Spinner /> : 'Recover'}
            </PrimaryButton>

            {links.map((link) => (
                <p key={link.path}>
                    {link.text}{' '}
                    <StyledLink exact="true" to={link.path}>
                        {link.anchorText}
                    </StyledLink>
                </p>
            ))}
        </>
    );
};

export default RecoverPassword;
