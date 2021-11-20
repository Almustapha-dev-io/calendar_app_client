import { EMAIL } from 'util/helpers/regexPatterns';

const recoveryForm = {
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
        }
    },
    valid: false
}

export default recoveryForm;