import React, { useMemo, useState, useCallback } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import setPasswordForm from './setPasswordForm';
import { PrimaryButton } from 'components/ui/StyledButton';
import { Input, FormGroup } from 'components/ui/StyledInput';
import { StyledLink } from 'components/ui/StlyedLinks';
import Spinner from 'components/ui/Spinner';
import { AlertDanger } from 'components/ui/StyledAlerts';

import useForm from 'hooks/useForm';
import useQuery from 'hooks/useQuery';
import controlValid from 'util/helpers/controlValid';
import { sendPost } from 'services/auth';

const Register = (props) => {
    const query = useQuery();
    const { push } = useHistory();
    const [state, setState] = useState({
        loading: false,
        errorMessage: '',
    });
    const token = useMemo(() => query.get('token'), [query]);
    const { form, changeHandler, controls } = useForm(setPasswordForm);

    const passwordsMatch = () => {
        const { password, confirmPassword } = form.controls;
        if (!password.touched || !confirmPassword.touched) return true;
        return password.value === confirmPassword.value;
    };

    const handleError = useCallback((err) => {
        if (!err.response) {
            toast('An unexpected errror occured!', { type: 'error' });
            return;
        }

        const { data } = err.response;
        setState((state) => ({
            ...state,
            loading: false,
            errorMessage: data.message,
        }));
    }, []);

    const submitHandler = () => {
        if (!form.valid) return;

        setState((state) => ({ ...state, loading: true }));
        const data = {
            token,
            password: form.controls.password.value,
            confirmPassword: form.controls.confirmPassword.value,
        };

        sendPost(data, '/reset-password')
            .then(() => {
                toast('Password reset successful.', { type: 'success' });
                push('/auth/login');
            })
            .catch(handleError);
    };

    if (!token) {
        return <Redirect to="/" />;
    }

    return (
        <>
            <h2>Set your new password</h2>

            {state.errorMessage && (
                <AlertDanger style={{ marginBottom: '10px   ' }}>
                    {state.errorMessage}
                </AlertDanger>
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
                        value={c.value}
                        disabled={state.loading}
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
                        margin: '20px 0',
                        color: '#f13740',
                    }}
                >
                    Your passwords must match
                </p>
            )}

            <PrimaryButton
                onClick={submitHandler}
                disabled={!form.valid || !passwordsMatch() || state.loading}
                style={{ margin: '20px 0' }}
                fullWidth
            >
                {state.loading ? <Spinner /> : 'Save'}
            </PrimaryButton>

            <p>
                <StyledLink exact="true" to="/auth/login">
                    Back to login
                </StyledLink>
            </p>
        </>
    );
};

export default Register;
