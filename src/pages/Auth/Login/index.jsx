import React from 'react';

import { PrimaryButton } from 'components/ui/StyledButton';
import { Input, FormGroup } from 'components/ui/StyledInput';
import { StyledNavLink } from 'components/ui/StlyedLinks';
import loginForm from './loginForm';
import useForm from 'hooks/useForm';
import controlValid from 'util/helpers/controlValid';
import Spinner from '../../../components/ui/Spinner';

const links = [
    {
        path: '/auth/register',
        anchorText: 'Register',
        text: `Don't have an account?`,
    },
    {
        path: '/auth/recover-password',
        anchorText: 'Recover it now',
        text: 'Forgot your password?',
    },
];


const Login = (props) => {
    const { form, changeHandler, controls } = useForm(loginForm);

    return (
        <>
            <h2>Login</h2>
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

            <PrimaryButton
                disabled={!form.valid}
                style={{ margin: '20px 0' }}
                fullWidth
            >
                Login
            </PrimaryButton>

            {links.map((link) => (
                <p key={link.path}>
                    {link.text}{' '}
                    <StyledNavLink exact to={link.path}>
                        {link.anchorText}
                    </StyledNavLink>
                </p>
            ))}
        </>
    );
};

export default Login;
