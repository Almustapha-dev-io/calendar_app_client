import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import registerForm from './registerForm';
import { PrimaryButton } from 'components/ui/StyledButton';
import { Input, FormGroup } from 'components/ui/StyledInput';
import { StyledLink } from 'components/ui/StlyedLinks';
import Spinner from 'components/ui/Spinner';
import { AlertDanger } from 'components/ui/StyledAlerts';
import useForm from 'hooks/useForm';
import controlValid from 'util/helpers/controlValid';
import { sendPost } from 'services/auth';

const Register = (props) => {
    const { push } = useHistory();
    const { form, changeHandler, controls } = useForm(registerForm);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

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
        setErrorMessage((_) => data.message);
    }, []);

    const registerHandler = () => {
        if (!form.valid) return;

        setLoading((_) => true);
        const data = {
            email: form.controls.email.value,
            firstName: form.controls.firstName.value,
            lastName: form.controls.lastName.value,
            password: form.controls.password.value,
        };

        sendPost(data, '/signup')
            .then(() => push('/auth/confirm'))
            .catch(handleError)
            .finally(() => setLoading((_) => false));
    };

    return (
        <>
            <h2>Create an account</h2>

            {errorMessage && (
                <AlertDanger style={{ marginBottom: '10px   ' }}>
                    {errorMessage}
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
                        disabled={loading}
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
                onClick={registerHandler}
                disabled={!form.valid || !passwordsMatch() || loading}
                style={{ margin: '20px 0' }}
                fullWidth
            >
                {loading ? <Spinner /> : 'Sign up'}
            </PrimaryButton>

            <p>
                Already have an account?{' '}
                <StyledLink exact="true" to="/auth/login">
                    Login
                </StyledLink>
            </p>
        </>
    );
};

export default Register;
