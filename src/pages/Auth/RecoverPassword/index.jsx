import React from 'react';
import { PrimaryButton } from 'components/ui/StyledButton';
import { Input, FormGroup } from 'components/ui/StyledInput';
import { StyledLink } from 'components/ui/StlyedLinks';
import recoveryForm from './recoveryForm';
import useForm from 'hooks/useForm';
import controlValid from 'util/helpers/controlValid';

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
    const { form, changeHandler, controls } = useForm(recoveryForm);

    const control = controls[0];

    return (
        <>
            <h2>Password Recovery</h2>
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
                    onChange={(e) => changeHandler(e.target.value, control.id)}
                />
                {control.errors.map((e) => (
                    <span className="error" key={e}>
                        {e}
                    </span>
                ))}
            </FormGroup>

            <PrimaryButton
                disabled={!form.valid}
                style={{ margin: '20px 0' }}
                fullWidth
            >
                Recover
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
