import React from 'react';
import { PrimaryButton } from 'components/ui/StyledButton';
import { Input, FormGroup } from 'components/ui/StyledInput';
import { StyledNavLink } from 'components/ui/StlyedLinks';


const Register = (props) => {
    return (
        <>
            <h2>Create an account</h2>
            <FormGroup>
                <label>Email</label>
                <Input type="email" />
            </FormGroup>
            
            <FormGroup>
                <label>First Name</label>
                <Input type="text" />
            </FormGroup>
            
            <FormGroup>
                <label>Last Name</label>
                <Input type="text" />
            </FormGroup>
            
            <FormGroup>
                <label>Password</label>
                <Input type="password" />
            </FormGroup>

            <FormGroup>
                <label>Confirm Password</label>
                <Input type="password" />
            </FormGroup>
            
            <PrimaryButton style={{ margin: '20px 0' }} fullWidth>
                Sign up
            </PrimaryButton>

            <p >
                Already have an account?{' '}
                <StyledNavLink exact to="/auth/login">
                    Login
                </StyledNavLink>
            </p>
        </>
    );
};


export default Register;
