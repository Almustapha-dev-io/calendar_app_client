import React from 'react';
import { PrimaryButton } from 'components/ui/StyledButton';
import { Input, FormGroup } from 'components/ui/StyledInput';
import { StyledLink } from 'components/ui/StlyedLinks';
import registerForm from './registerForm';
import useForm from 'hooks/useForm';
import controlValid from 'util/helpers/controlValid';

const Register = (props) => {
    const { form, changeHandler, controls } = useForm(registerForm);

    const passwordsMatch = () => {
        const { password, confirmPassword } = form.controls;
        if (!password.touched || !confirmPassword.touched) return true;
        return password.value === confirmPassword.value;
    };

    return (
        <>
            <h2>Create an account</h2>
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
                disabled={!form.valid || !passwordsMatch()}
                style={{ margin: '20px 0' }}
                fullWidth
            >
                Sign up
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
