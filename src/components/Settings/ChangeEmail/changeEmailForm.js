import { EMAIL } from 'util/helpers/regexPatterns';

const loginForm = {
    controls: {
        email: {
            id: 'email',
            elementType: 'input',
            config: {
                type: 'email'
            },
            label: 'New Email',
            value: '',
            validation: {
                required: {
                    value: true,
                    message: 'Your new email is required!'
                },
                pattern: {
                    value: EMAIL,
                    message: 'Enter a valid email address'
                }
            },
            touched: false,
            valid: false,
            errors: []
        },
        password: {
            id: 'password',
            elementType: 'input',
            config: {
                type: 'password'
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
        }
    },
    valid: false
}

export default loginForm;