import React from 'react';
import { PrimaryButton } from 'components/ui/StyledButton';
import { Input, FormGroup } from 'components/ui/StyledInput';
import { StyledLink } from 'components/ui/StlyedLinks';
import setPasswordForm from './setPasswordForm';
import useForm from 'hooks/useForm';
import controlValid from 'util/helpers/controlValid';
import useQuery from 'hooks/useQuery';

const Register = (props) => {
    const { form, changeHandler, controls } = useForm(setPasswordForm);

    const passwordsMatch = () => {
        const { password, confirmPassword } = form.controls;
        if (!password.touched || !confirmPassword.touched) return true;
        return password.value === confirmPassword.value;
    };

    return (
        <>
            <h2>Set your new password</h2>
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
                Save
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
