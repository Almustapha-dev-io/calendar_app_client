import { EMAIL } from 'util/helpers/regexPatterns';

const registerForm = {
    controls: {
        email: {
            id: 'email',
            elementType: 'input',
            config: {
                type: 'email'
            },
            label: 'Email',
            value: '',
            validation: {
                required: {
                    value: true,
                    message: 'Your email is required!'
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
        firstName: {
            id: 'firstName',
            elementType: 'input',
            config: {
                type: 'text'
            },
            label: 'First Name',
            value: '',
            validation: {
                required: {
                    value: true,
                    message: 'Your first name is required!'
                },
                minLength: {
                    value: 2,
                    message: 'First name must be atleast 2 characters'
                },
                maxLength: {
                    value: 24,
                    message: 'First name must be atmost 24 characters'
                }
            },
            touched: false,
            valid: false,
            errors: []
        },
        lastName: {
            id: 'lastName',
            elementType: 'input',
            config: {
                type: 'text'
            },
            label: 'Last Name',
            value: '',
            validation: {
                required: {
                    value: true,
                    message: 'Your last name is required!'
                },
                minLength: {
                    value: 2,
                    message: 'Last name must be atleast 2 characters'
                },
                maxLength: {
                    value: 24,
                    message: 'Last name must be atmost 24 characters'
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

export default registerForm;