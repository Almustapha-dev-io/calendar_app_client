const setPasswordForm = {
    controls: {
        password: {
            id: 'password',
            elementType: 'input',
            config: {
                type: 'password',
            },
            label: 'Password',
            value: '',
            validation: {
                required: {
                    value: true,
                    message: 'Enter your password'
                }
            },
            touched: false,
            valid: false,
            errors: []
        },
        confirmPassword: {
            id: 'confirmPassword',
            elementType: 'input',
            config: {
                type: 'password'
            },
            label: 'Confirm Password',
            value: '',
            validation: {
                required: {
                    value: true,
                    message: 'Please confirm your password'
                }
            },
            touched: false,
            valid: false,
            errors: []
        }
    },
    valid: false
}

export default setPasswordForm;