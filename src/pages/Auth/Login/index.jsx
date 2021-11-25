import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

import loginForm from './loginForm';
import { PrimaryButton } from 'components/ui/StyledButton';
import { Input, FormGroup } from 'components/ui/StyledInput';
import { StyledLink } from 'components/ui/StlyedLinks';
import Spinner from 'components/ui/Spinner';
import { AlertDanger, AlertSuccess } from 'components/ui/StyledAlerts';
import useForm from 'hooks/useForm';
import useQuery from 'hooks/useQuery';
import controlValid from 'util/helpers/controlValid';
import { sendPost } from 'services/auth';
import { authSuccess } from 'store/actions';

const links = [
    {
        path: '/auth/register',
        anchorText: 'Create one',
        text: `Don't have an account?`,
    },
    {
        path: '/auth/recover-password',
        anchorText: 'Recover it now',
        text: 'Forgot your password?',
    },
];

const Login = () => {
    const query = useQuery();
    const { form, changeHandler, controls } = useForm(loginForm);
    const [state, setState] = useState({
        loading: false,
        errorMessage: '',
        verificationMsg: '',
    });
    const dispatch = useDispatch();

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

    useEffect(() => {
        const token = query.get('token');
        if (token) {
            setState((state) => ({ ...state, loading: true }));

            sendPost({ token }, '/verify')
                .then(() =>
                    setState((state) => ({
                        ...state,
                        loading: false,
                        verificationMsg:
                            'Your account has been confirmed! Please login',
                    }))
                )
                .catch(handleError);
        }
    }, [handleError, query]);

    const loginHandler = () => {
        if (!form.valid) return;

        setState((state) => ({ ...state, loading: true }));
        const data = {
            email: form.controls.email.value,
            password: form.controls.password.value,
        };
        sendPost(data)
            .then((res) => {
                setState((state) => ({ ...state, loading: false }));
                dispatch(authSuccess(res.data.data));
            })
            .catch(handleError);
    };

    return (
        <>
            <h2>Login</h2>

            {state.errorMessage && (
                <AlertDanger style={{ marginBottom: '10px   ' }}>
                    {state.errorMessage}
                </AlertDanger>
            )}

            {state.verificationMsg && (
                <AlertSuccess style={{ marginBottom: '10px   ' }}>
                    {state.verificationMsg}
                </AlertSuccess>
            )}

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

            <PrimaryButton
                onClick={loginHandler}
                disabled={!form.valid || state.loading}
                style={{ margin: '20px 0' }}
                fullWidth
            >
                {state.loading ? <Spinner /> : 'Login'}
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

export default Login;
