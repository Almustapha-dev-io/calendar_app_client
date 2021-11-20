import React from 'react';
import { PrimaryButton } from 'components/ui/StyledButton';
import { Input, FormGroup } from 'components/ui/StyledInput';
import { StyledNavLink } from 'components/ui/StlyedLinks';

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
    return (
        <>
            <h2>Login</h2>
            <FormGroup>
                <label>Email</label>
                <Input type="email" />
            </FormGroup>
            <FormGroup>
                <label>Password</label>
                <Input type="password" />
            </FormGroup>
            <PrimaryButton style={{ margin: '20px 0' }} fullWidth>
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
