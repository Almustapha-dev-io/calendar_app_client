const setPasswordForm = {
    controls: {
        oldPassword: {
            id: 'oldPassword',
            elementType: 'input',
            config: {
                type: 'password',
            },
            label: 'Current password',
            value: '',
            validation: {
                required: {
                    value: true,
                    message: 'Enter your current password'
                }
            },
            touched: false,
            valid: false,
            errors: []
        },
        newPassword: {
            id: 'newPassword',
            elementType: 'input',
            config: {
                type: 'password',
            },
            label: 'New password',
            value: '',
            validation: {
                required: {
                    value: true,
                    message: 'Enter your new password'
                }
            },
            touched: false,
            valid: false,
            errors: []
        },
        confirmNewPassword: {
            id: 'confirmNewPassword',
            elementType: 'input',
            config: {
                type: 'password'
            },
            label: 'Confirm new password',
            value: '',
            validation: {
                required: {
                    value: true,
                    message: 'Please confirm your new password'
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