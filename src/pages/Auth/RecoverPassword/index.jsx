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
        path: '/auth/login',
        anchorText: 'Login',
        text: 'Remember your password?',
    },
];

const RecoverPassword = (props) => {
    return (
        <>
            <h2>Password Recovery</h2>
            <FormGroup>
                <label>Email address</label>
                <Input type="email" />
            </FormGroup>

            <PrimaryButton style={{ margin: '20px 0' }} fullWidth>
                Recover
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

export default RecoverPassword;
